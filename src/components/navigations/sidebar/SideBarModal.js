export function CreatGroupModal(){
    return(
        <div class="modal fade" id="subGroup" tabindex="-1" role="dialog" aria-labelledby="ModalLabel"
            aria-hidden="true">
            <div class="modal-dialog" role="document">
                <div class="modal-content">
                    <div class="modal-header">
                        <h5 class="modal-title">소그룹을 추가하시겠습니까?</h5>
                        <button class="close" type="button" data-dismiss="modal" aria-label="Close">
                            <span aria-hidden="true">×</span>
                        </button>
                    </div>
                    <input type="text" class="form-control form-control-user modalInput"
                            id="InputForumName"
                            placeholder="그룹명을 입력해주세요. "/>
                    <div class="modal-footer">
                        <button class="btn btn-secondary" type="button" data-dismiss="modal">취소</button>
                        <a class="btn btn-primary" onclick="addForum()"> 추가</a>
                    </div>
                </div>
            </div>
        </div>
    )
}

export function DeleteGroupModal(){
    return(
        <div class="modal fade" id="deleteSmallGroup" tabindex="-1" role="dialog" aria-labelledby="ModalLabel"
            aria-hidden="true">
            <div class="modal-dialog" role="document">
                <div class="modal-content">
                    <div class="modal-header">
                        <h5 class="modal-title">삭제할 소그룹을 선택하세요.</h5>
                        <button class="close" type="button" data-dismiss="modal" aria-label="Close">
                            <span aria-hidden="true">×</span>
                        </button>
                    </div>

                    <div class="forum-delete-list">
                    </div>

                    <div class="modal-footer">
                        <button class="btn btn-secondary" type="button" data-dismiss="modal">취소</button>
                        <a class="btn btn-primary" onclick="deleteForum()"> 삭제</a>
                    </div>
                </div>
            </div>
        </div>
    )
}