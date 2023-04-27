import { fetchUser } from "./fetchUser";
import { RemoveSavePin, SavePin } from "../features/usersSlice";
import FileSaver from "file-saver";
import { deletePin } from "../features/pinsSlice";
import { useNavigate } from "react-router-dom";


export const handleDeletePin = async ({e, pinId, navigate, dispatch}:any) => {    
    if (pinId) {
      await dispatch(deletePin({pinId}))
      navigate('/')
    }
}

export const savePin = async ({e, user, pin, saved, dispatch}:any) => {
  user = fetchUser()
  if (!saved) {
    await dispatch(SavePin({user, pin}))
    .then(() => {
      window.location.reload();
    })
    .catch((error:any) => console.log(error))
  }   
}

export const removeSavePin = async ({e, user, pin, saved, dispatch}:any) => {   
    user = fetchUser()
    if (saved) {
      await dispatch(RemoveSavePin({user, pin}))
      .then(() => {
       window.location.reload();
      })
      .catch((error:any) => console.log(error))  
    }
  }

export async function handleDownload({e, pin}:any) {
    e.stopPropagation()
    FileSaver.saveAs(pin?.image.toString()!, `${pin?.title.toString()!}.jpg`);
  }