


export const handleGoToProfile = ({creatorId, navigate}:any) => {
    //window.scrollTo(0, 0)
    navigate(`/user-profile/${creatorId}`)    
    //window.location.reload();
  }

export const handleGoToPin = ({_id, navigate}:any) => {
    //window.scrollTo(0, 0)
    navigate(`/pin-detail/${_id}`)
    //window.location.reload();
  }