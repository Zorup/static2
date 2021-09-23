export function CreatGroupModal(){
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
                            id="InputForumName"
                            placeholder="그룹명을 입력해주세요. "/>
                    <div className="modal-footer">
                        <button className="btn btn-secondary" type="button" data-dismiss="modal">취소</button>
                        <a className="btn btn-primary"> 추가</a>
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