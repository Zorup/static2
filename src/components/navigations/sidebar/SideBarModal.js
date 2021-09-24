import axios from 'axios';
import { useState, useCallback } from 'react';
import jQuery from 'jquery';
import $ from 'jquery';

export function CreatGroupModal({forumList, setForumList}){

    const [forumName, setForumName] = useState("");
    const onChangeForumName = useCallback (e=>setForumName(e.target.value), []);
    const createForum = async()=>{
        try{
            const response = await axios.post(
                `http://localhost:8081/main/v1/forum?forumName=${forumName}`,
                null,
                {
                    withCredentials: true
                }
            );
            setForumName("");
            setForumList([
                ...forumList,
                response.data.data
            ]);
            $('#subGroup').modal('hide');
        }catch(e){
        }
    }
    
    return(
        <div className="modal fade" id="subGroup" tabIndex="-1" role="dialog" aria-labelledby="ModalLabel"
            aria-hidden="true">
            <div className="modal-dialog" role="document">
                <div className="modal-content">
                    <div className="modal-header">
                        <h5 className="modal-title">소그룹을 추가하시겠습니까?</h5>
                        <button className="close" type="button" data-dismiss="modal" aria-label="Close">
                            <span aria-hidden="true">×</span>
                        </button>
                    </div>
                    <input type="text" className="form-control form-control-user modalInput"
                            value={forumName}
                            onChange={onChangeForumName}
                            placeholder="그룹명을 입력해주세요. "/>
                    <div className="modal-footer">
                        <button className="btn btn-secondary" type="button" data-dismiss="modal">취소</button>
                        <a className="btn btn-primary" onClick={createForum}> 추가</a>
                    </div>
                </div>
            </div>
        </div>
    )
}

export function DeleteGroupModal({forumList, setForumList}){
    const [deleteTarget, setDeleteTarget] = useState(new Set());

    const selectList = forumList.map(item=>(
        <ForumDeleteList forum={item} deleteTarget={deleteTarget} setDeleteTarget={setDeleteTarget} key={item.forumId} />
    ));

    const deleteForum = async()=>{
        if(deleteTarget.size === 0) return;
        
        const params = new URLSearchParams();
        for(let item of deleteTarget){
            params.append('forumId', item);
        }

        try{
            const response = await axios.delete(
                'http://localhost:8081/main/v1/forum',
                {data : params},
                {
                    headers: {
                        'Content-Type': 'application/x-www-form-urlencoded',
                    },
                    withCredentials: true
                }
            );
            setForumList(forumList.filter(item=> !deleteTarget.has(item.forumId)));
            setDeleteTarget(new Set());
            $('#deleteSmallGroup').modal('hide');
        }catch(e){
        }
    }

    return(
        <div className="modal fade" id="deleteSmallGroup" tabIndex="-1" role="dialog" aria-labelledby="ModalLabel"
            aria-hidden="true">
            <div className="modal-dialog" role="document">
                <div className="modal-content">
                    <div className="modal-header">
                        <h5 className="modal-title">삭제할 소그룹을 선택하세요.</h5>
                        <button className="close" type="button" data-dismiss="modal" aria-label="Close">
                            <span aria-hidden="true">×</span>
                        </button>
                    </div>

                    <div className="forum-delete-list">
                        {selectList}
                    </div>

                    <div className="modal-footer">
                        <button className="btn btn-secondary" type="button" data-dismiss="modal">취소</button>
                        <a className="btn btn-primary" onClick={deleteForum}> 삭제</a>
                    </div>
                </div>
            </div>
        </div>
    )
}

function ForumDeleteList({forum, deleteTarget, setDeleteTarget}){

    const checkHandler = (e) =>{
        if(e.currentTarget.checked){
            if(!deleteTarget.has(forum.forumId)){
                const newDeleteTarget = new Set(deleteTarget);
                newDeleteTarget.add(forum.forumId);
                setDeleteTarget(newDeleteTarget);
            }
        }else{
            if(deleteTarget.has(forum.forumId)){
                const newDeleteTarget = [...deleteTarget].filter(item=>item !== forum.forumId);
                setDeleteTarget(new Set(newDeleteTarget));
            }
        }
    };

    return(
        <div className="selectBox">
            <input name='fList' 
                   value= {forum.forumId}
                   type='checkbox'
                   onChange={checkHandler}/>
            <span>{forum.forumName}</span>
        </div>
    )
}