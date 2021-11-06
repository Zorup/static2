const RESIZE_WIDTH = 400

export const parseContents = async (content)=>{
    let parseWrapper = document.createElement('div');
    parseWrapper.innerHTML = content.trim();
    
    //save image data & convert image url to empty String
    let imageTags = parseWrapper.querySelectorAll("img");
    let base64imgURLList = [];
    for(let i=0; i<imageTags.length; i++){
        base64imgURLList.push(imageTags[i].src);
        imageTags[i].src = "";
    }
    let formData = new FormData();
    let imageList = await base64ListToBlobList(base64imgURLList)
    formData.append('content', parseWrapper.innerHTML);
    imageList.forEach( (image, i) => {
        formData.append(`images[${i}].seq`, image.seq);
        formData.append(`images[${i}].blobImage`, image.blobImage);
    })
    return formData
}

export const parseView = async (list)=>{
    let viewLists = []
    for(let i=0; i<list.length; i++){
        if(list[i].images.length !== 0) {
            let parseWrapper = document.createElement('div');
            parseWrapper.innerHTML = list[i].content.trim();
            let imageTags = parseWrapper.querySelectorAll('img'); 

            for(let j=0; j<imageTags.length; j++){
                let base64ImgURL = "data:" + list[i].images[j].type + ";base64," + list[i].images[j].data;
                imageTags[j].src = await resizing(base64ImgURL)
            }
            list[i].images = []
            list[i].content = parseWrapper.innerHTML
        }
        viewLists.push(list[i])
    }
    return viewLists
}

const base64ToBlob = (url) => fetch(url).then(result => result.blob());

const base64ListToBlobList = async (urlList) => {
    let parallelFuncs = [];
    let blobList = [];
    for(let i=0; i<urlList.length; i++){
        parallelFuncs.push(
            base64ToBlob(urlList[i])    // 일단 비동기적으로 호출은 발생함 -> 병렬로처리됨
        );
    }
    for(let i=0; i<parallelFuncs.length; i++){
        blobList.push(
            {
                seq: i+1,
                blobImage: await parallelFuncs[i]     // 병렬처리된 결과는 전부 확실하게 받아두고
            }
        );
    }
    return blobList;    // 결과 반환
}

const resizing = (datas) => {
    return new Promise(async (resolve, reject) =>{
        var img = document.createElement('img');
        img.src = datas;

        img.onload = () => {
            //기존 이미지 너비
            var iw = img.width;
            var ih = img.height;
            var rCoefficient = Math.min(iw, RESIZE_WIDTH)
            var height = ih * rCoefficient / iw
            
            var canvas = document.createElement('canvas');
            var ctx = canvas.getContext('2d');
            canvas.width = rCoefficient;
            canvas.height = height;

            ctx.drawImage(img, 0, 0, rCoefficient, height);
            var dataURI = canvas.toDataURL();
            resolve(dataURI);
        };
    })
}