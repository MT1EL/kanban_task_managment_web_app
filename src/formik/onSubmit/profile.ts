import {
  AuthError,
  EmailAuthProvider,
  getAuth,
  reauthenticateWithCredential,
  updatePassword,
  updateProfile,
} from "firebase/auth";
import { doc, updateDoc } from "firebase/firestore";
import { database } from "../../../firebase";

export const deleteUserOnSubmit = (
  values: { password: string },
  toast: any,
  onClose: () => void,
  formik: any
) => {
  const user = getAuth().currentUser;
  const credential = EmailAuthProvider.credential(
    user?.email as string,
    values.password
  );
  return reauthenticateWithCredential(user, credential)
    .then((user) =>
      user.user.delete().then(() => {
        toast({
          status: "success",
          title: "Account Deleted",
          description: "Your account has been deleted successfully",
        });
      })
    )
    .catch((error: AuthError) => {
      onClose();
      formik.setErrors({ password: "wrong password" });
    });
};

export const updateUserOnSubmit = (values: { name: string }, toast) => {
  const auth = getAuth();
  const user = auth.currentUser;

  if (user) {
    updateProfile(user, {
      displayName: values.name,
    })
      .then(() => {
        const userRef = doc(database, "users", user.uid);
        updateDoc(userRef, { name: values.name })
          .then(() =>
            toast({
              status: "success",
              title: "Profile Updated",
              description: "Your profile has been updated successfully",
            })
          )
          .catch((error: AuthError) => console.log(error));
      })
      .catch((error: AuthError) => console.log(error));
  }
};

export const updatePassowrdOnSubmit = (
  values: { "Current password": string; "New password": string },
  toast: any,
  formik: any
) => {
  const user = getAuth().currentUser;
  if (!user) return;
  const credential = EmailAuthProvider.credential(
    user.email as string,
    values["Current password"]
  );
  reauthenticateWithCredential(user, credential)
    .then(() =>
      updatePassword(user, values["New password"]).then(() => {
        toast({
          status: "success",
          title: "Password changed Succesfully",
        });
        formik.resetForm();
      })
    )
    .catch((error: AuthError) =>
      formik.setFieldError("Current password", error.message)
    );
};
