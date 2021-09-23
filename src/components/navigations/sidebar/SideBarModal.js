import axios from 'axios';
import { useState, useCallback } from 'react';
import jQuery from 'jquery';
import $ from 'jquery';

export function CreatGroupModal({forumList, setForumList}){

    const [forumName, setForumName] = useState("");
    const onChangeForumName = useCallback (e=>setForumName(e.target.value), []);
    console.log(forumList);
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

export function DeleteGroupModal(){
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
                    </div>

                    <div className="modal-footer">
                        <button className="btn btn-secondary" type="button" data-dismiss="modal">취소</button>
                        <a className="btn btn-primary"> 삭제</a>
                    </div>
                </div>
            </div>
        </div>
    )
}