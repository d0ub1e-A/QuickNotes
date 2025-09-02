import { useEffect, useState, type FormEvent } from "react";
import { api } from "../assets/utilities/utilApi";
import { useNavigate } from "react-router-dom";
import { Edit2, LogOut, User2, CircleX, Mail, Lock, User, Check, LockOpen, Eye, EyeOff } from "lucide-react";
import { isValidPassword } from "../assets/utilities/utilCheckInfo";

import { useAppSelector, useAppDispatch } from "../hooks";
import { refetchUser } from "../features/sliceShortActions";
import { showToaster, hideToaster } from "../features/sliceToaster";
import { handleError } from "../features/sliceErrorHandle";

import DeleteAccDialog from "../components/modal/ModalDeleteAccount";
import type { AxiosError } from "axios";

export default function UserProfilePage() {
  const dispatch = useAppDispatch();
  const {userNotes} = useAppSelector(state => state.handleNotes);
  const userInfo = useAppSelector(state => state.userInfo);

  const navTo = useNavigate();

  const [inEditMode, setInEditMode] = useState(false);
  const [oldPassword, setOldPassword] = useState('');
  const [newPassword, setNewPassword] = useState('');
  const [passwordChangeTrigger, setPasswordChangeTrigger] = useState(false);
  const [showPassErrMsg, setShowPassErrMsg] = useState(false);
  const [showDeleteAccDialog, setShowDeleteAccDialog] = useState(false);
  const [showOldPassword, setShowOldPassword] = useState(false);
  const [showNewPassword, setShowNewPassword] = useState(false);

  const numberOfNotes = userNotes.reduce((acc, note) => acc + note.notes.length, 0);
  const numberOfTags = userNotes.length;

  // prevents users from setting short length password
  useEffect(() => setShowPassErrMsg(false), [passwordChangeTrigger]);

  // Clears the state for password visibility
  useEffect(() => {
    setShowNewPassword(false);
    setShowOldPassword(false);
  }, [passwordChangeTrigger]);

  // toggles the old password visibility
  function toggleOldPasswordVisibility() {
    setShowOldPassword(prev => !prev);

    const input: HTMLInputElement | null = document.querySelector('input[type="text"], input[type="password"]');

    setTimeout(() => {
      if (input) input.selectionStart = input.selectionEnd = input.value.length;
    }, 0)
  }

  // toggles the new password visibility
  function toggleNewPasswordVisibility() {
    setShowNewPassword(prev => !prev);

    const input: HTMLInputElement | null = document.querySelector('input[type="text"], input[type="password"]');

    setTimeout(() => {
      if (input) input.selectionStart = input.selectionEnd = input.value.length;
    }, 0)
  }

  // update the name and email only
  async function updateUserProfile(e: FormEvent<HTMLFormElement>) {
    e.preventDefault();

    const formInfo = new FormData(e.currentTarget);
    const {changedName, changedEmail} = Object.fromEntries(formInfo);

    const message: Record<number, string> = {
      200: 'Your profile has been updated successfully.',
      400: 'Bad request. Please try again!',
      401: 'Wrong credentials. Try again.',
      500: 'Internal server error. Please try again!',
      0: "Unexpected error occurred."
    }

    try {
      const nameEmailRes = await api.patch(`/user`, {
        name: changedName,
        email: changedEmail
      });

      if (nameEmailRes.status === 200) {
        setInEditMode(false);
        dispatch(refetchUser(true));
        dispatch(showToaster({type: "success", text: message[200]}));
        setTimeout(() => {
          dispatch(hideToaster());
        }, 1500);
        
        // notifyUser('success', message[nameEmailRes.status])
      }
    }catch (error) {
      const errorCode = (error as AxiosError).status || 0;
      
      
      // if (error.status === 400) notifyUser('error', message[error.status]);
      // if (error.status === 401) notifyUser('error', message[error.status]);
      // if (error.status === 500) notifyUser('error', message[error.status]);
      
      handleError({status: errorCode, messages: message}, dispatch);
      console.error(error);
    }
  }

  // update the password only
  async function updatePassword(e: FormEvent<HTMLFormElement>) {
    e.preventDefault();

    const message: Record<number, string> = {
      200: 'Password has been updated successfully.',
      400: 'Bad request. Please try again!',
      401: 'Wrong password. Try again.',
      500: 'Internal server error. Please try again!',
      0: "Unexpected error occurred."
    }

    if (isValidPassword(newPassword)) {
      setShowPassErrMsg(false);

      try {
        const passRes = await api.patch(`/user/password`, {
          old_password: oldPassword,
          new_password: newPassword
        });

        if (passRes.status === 200) {
          setPasswordChangeTrigger(false);
          dispatch(showToaster({type: "success", text: message[200]}));
          setTimeout(() => {
            dispatch(hideToaster());
          }, 2000);
        }
      } catch (error) {
        const errorCode = (error as AxiosError).status || 0;
        
        
        // if (error.status === 400) notifyUser('error', message[error.status]);
        // if (error.status === 401) notifyUser('error', message[error.status]);
        // if (error.status === 500) notifyUser('error', message[error.status]);
        handleError({status: errorCode, messages: message}, dispatch);
        console.error(error);
      }
    }
    else {
      setShowPassErrMsg(true);
    }
  }

  // handles logout
  async function logout() {
    try {
      const logoutRes = await api.post('/auth/logout');

      logoutRes.status === 200 && navTo('/login');
    } catch (error) {
      const errorCode = (error as AxiosError).status;
      
      if (errorCode === 500) { 
        dispatch(showToaster({type: 'error', text:'Internal server error. Please try again!'}) );
        setTimeout(() => {
          dispatch(hideToaster());
        }, 2000);
      }
      console.error(error);

    }
  }

  // deletes the account and send to the login page
  async function deleteAccount() {
    const message = {
      200: 'Account has been deleted successfully.',
      500: 'Internal server error. Please try again!'
    }

    try {
      const deleteAccRes = await api.delete('/user');

      if (deleteAccRes.status === 200) {
        navTo('/login');
        dispatch(showToaster({type: 'success', text:message[deleteAccRes.status]}));
        setTimeout(() => {
          dispatch(hideToaster());
        }, 2000);
      }
    } catch (error) {
      const errorCode = (error as AxiosError).status;
      
      console.error(error);

      if (errorCode === 401) navTo(`/login`);
      if (errorCode === 500) {
        dispatch(showToaster({type:'error', text:message[errorCode]}));
        setTimeout(() => {
          dispatch(hideToaster());
          
        }, 2000);
      }
    }
  }

  return (
    <div className={`h-full flex justify-center items-center bg-white dark:bg-black p-16`}>
      
      {/* modal for confirming account deletion */}
      <DeleteAccDialog
        showDeleteAccDialog={showDeleteAccDialog}
        deleteAccount={deleteAccount}
        setShowDeleteAccDialog={setShowDeleteAccDialog}
      />

      <section className={`p-8 ${showDeleteAccDialog ? 'brightness-75' : ''} rounded-[20px] shadow-xl w-svw md:w-[50svw] bg-[whitesmoke]/90 transition-all`}>

        {inEditMode ?
          // form for changing name and email only
          <form
            onSubmit={updateUserProfile}
            className={`flex flex-col gap-4 fira-mono p-5`}
          >

            <label className={`flex items-center gap-3 text-grey-mid`}><User />Name</label>
            <input
              type="text"
              name="changedName"
              defaultValue={userInfo.name}
              className={`px-4.5 py-2 text-[1.2rem] border border-grey-mid rounded-[15px]`}
            />

            <label className={`flex items-center gap-3 text-grey-mid`}><Mail />Email</label>
            <input
              type="email"
              name="changedEmail"
              defaultValue={userInfo.email}
              className={`px-4.5 py-2 text-[1.2rem] rounded-[15px] border border-grey-mid`}
            />

            <div className={`flex justify-between gap-12 mt-10`}>
              <button
                onClick={() => { updateUserProfile }}
                className={`p-2 rounded-[15px] update-profile w-full text-xl text-grey-bold border border-grey-mid flex items-center justify-center gap-3`}
              ><Check className={`text-green-600`} />Save</button>
              <button
                type="button"
                onClick={() => setInEditMode(false)}
                className={`flex items-center gap-3 justify-center bg-red-mid p-2 rounded-[15px] cancel-edit w-full text-xl text-gray-100 font-medium`}
              ><CircleX />Cancel</button>
            </div>

          </form> :
          // shows the profile info + password changing section
          <div className={`cal-sans flex flex-col gap-10`}>

            {/* user name + edit profile button */}
            <div className={`flex justify-between items-center`}>
              <div className={`flex items-center gap-3`}>
                <div className={`bg-gradient-to-br from-purple-lite to-purple-500 rounded-[10px] w-fit p-3`}>
                  <User2
                    size={35}
                    className={`text-white`}
                  />
                </div>
                <div>
                  <h1 className={`text-[1.2rem]`}>{userInfo.name}</h1>
                  <p className={`text-grey-mid text-[.8rem]`}>Profile Settings</p>
                </div>
              </div>
              <button
                onClick={() => setInEditMode(prev => !prev)}
                className={`border-grey-mid border p-2 rounded-[10px] profile-edit-button`}
              ><Edit2 className={`text-grey-mid`} />
              </button>
            </div>

            {/* email section */}
            <div className={`bg-white p-5 rounded-[15px]`}>
              <h3 className={`flex gap-1 items-center my-2.5`}><Mail className={`text-indigo-500`} />Email</h3>
              <h2 className={`truncate`}>{userInfo.email}</h2>
            </div>

            {/* password section */}
            {passwordChangeTrigger ?
              <form
                onSubmit={updatePassword}
                className={`flex flex-col gap-3`}
              >
                <label className={`flex items-center gap-3 text-grey-mid`}><Lock />Old Password</label>
                <div className={`rounded-[15px] border border-grey-mid flex items-center pr-4.5`}>
                  <input
                    type={showOldPassword ? 'text' : 'password'}
                    onChange={e => setOldPassword(e.target.value)}
                    className={`px-4.5 py-2 text-[1.2rem] w-full`}
                  />
                  <button
                    type="button"
                    onClick={toggleOldPasswordVisibility}
                    className={`text-grey-mid`}
                  >{showOldPassword ? <EyeOff /> : <Eye />}
                  </button>
                </div>

                <label className={`flex items-center gap-3 text-grey-mid`}><LockOpen />New Password</label>
                <div className={`rounded-[15px] border border-grey-mid flex items-center pr-4.5`}>
                  <input
                    type={showNewPassword ? 'text' : 'password'}
                    onChange={e => setNewPassword(e.target.value)}
                    className={`px-4.5 py-2 text-[1.2rem] w-full`}
                  />
                  <button
                    type="button"
                    onClick={toggleNewPasswordVisibility}
                    className={`text-grey-mid`}
                  >{showNewPassword ? <EyeOff /> : <Eye />}
                  </button>
                </div>
                <p className={`text-red-mid text-xs md:text-sm py-1 ${showPassErrMsg ? 'scale-100 translate-x-0' : 'scale-0 translate-x-5'} transition-all`}>Need at least 8 characters</p>

                <div className={`flex justify-between gap-3`}>
                  <button
                    onClick={() => updatePassword}
                    className={`px-2 py-1.5 cal-sans rounded-[15px] border border-grey-lite logout text-grey-bold w-full flex items-center justify-center gap-2`}
                  ><Check />Update</button>
                  <button
                    onClick={() => { setPasswordChangeTrigger(false) }}
                    type="button"
                    className={`delete-account px-2 py-1.5 cal-sans bg-red-mid text-white rounded-[15px] w-full flex items-center justify-center gap-2`}
                  ><CircleX />Cancel</button>
                </div>
              </form> :
              <div className={`bg-white p-5 rounded-[15px] relative`}>
                <h3 className={`flex gap-1 items-center my-2.5`}><Lock className={`text-indigo-500`} />Password</h3>
                <input
                  disabled
                  type="password"
                  defaultValue={`password`}
                  className={`outline-none`}
                />
                <button
                  onClick={() => { setPasswordChangeTrigger(true) }}
                  className={`absolute border border-grey-mid/50 change-password px-3 py-1.5 text-[15px] rounded-[10px] right-4 top-1/2 -translate-y-1/2 bg-blue-100/60`}>Change</button>
              </div>
            }

            {/* Note Stat section */}
            <div className={`bg-blue-200/50 rounded-[15px]`}>
              <div className={`flex justify-around p-2.5 rounded-[15px] bg-clip-text bg-gradient-to-r from-blue-600 to-red-600`}>
                <div className={`text-center`}>
                  <p className={`text-[2rem] font-bold text-transparent`}>{numberOfNotes}</p>
                  <p className={`text-[.8rem] text-grey-mid`}>Total Notes</p>
                </div>
                <div className={`text-center`}>
                  <p className={`text-[2rem] font-bold text-transparent`}>{numberOfTags}</p>
                  <p className={`text-[.8rem] text-grey-mid`}>Tags Used</p>
                </div>
              </div>
            </div>

            {/* logout + account deletion button */}
            <div className={`flex justify-between gap-3`}>
              <button
                onClick={logout}
                className={`px-2 py-1.5 cal-sans rounded-[15px] border border-grey-lite logout text-grey-bold w-full flex items-center justify-center gap-2`}
              ><LogOut />Logout</button>
              <button
                onClick={() => { setShowDeleteAccDialog(true) }}
                className={`delete-account px-2 py-1.5 cal-sans bg-red-mid text-white rounded-[15px] w-full flex items-center justify-center gap-2`}
              ><CircleX />Delete Account</button>
            </div>

          </div>
        }
      </section>
    </div>
  );
}
