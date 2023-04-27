export const handleGoToPin = ({_id, navigate}:any) => {
    window.scrollTo(0, 0)
    navigate(`/pin-detail/${_id}`)
    window.location.reload();
  }