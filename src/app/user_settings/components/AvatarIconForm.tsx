"use client";
import React, { createRef } from "react";
import supabase from "@/app/utils/supabase";
import Cropper, { ReactCropperElement } from "react-cropper";
import useProfileMutation from "../hooks/useProfileMutation";
import { Profile } from "../../types/types";
import styles from "../userSettings.module.scss";
import "cropperjs/dist/cropper.css";

const AvatarIconForm = ({
  loginUser,
  setDisplay,
}: {
  loginUser: Profile;
  setDisplay: Function;
}) => {
  const [file, setFile] = React.useState<File | null>(null);
  const [pathname, setPathname] = React.useState("");
  const profileMutation = useProfileMutation(loginUser.id);
  const cropperRef = createRef<ReactCropperElement>();
  const [image, setImage] = React.useState<string | null>(null);

  const changeInput = (e: React.ChangeEvent<HTMLInputElement>) => {
    const f = e.currentTarget.files;
    if (!f || f.length === 0) return;
    setFile(f[0]);
    setPathname(`${loginUser.id}/${f[0].name}`);
    const reader = new FileReader();
    reader.addEventListener("load", () => {
      setImage(reader.result as string);
    });
    reader.readAsDataURL(f[0]);
  };

  const registerIcon = async (file: File) => {
    const { error: deleteError } = await supabase.storage
      .from("avatar_image")
      .remove([loginUser.avatar_url]);
    const { data, error } = await supabase.storage
      .from("avatar_image")
      .upload(pathname, file, { cacheControl: "3600", upsert: true });
    if (error) throw new Error(error.message);
    profileMutation.mutate({ avatar_url: data.path });
    window.alert("プロフィール画像を設定しました");
    setDisplay("none");
  };

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (typeof cropperRef.current?.cropper === "undefined") return;
    cropperRef.current.cropper.getCroppedCanvas({ fillColor: "white" }).toBlob((blob) => {
      if (!blob) return;
      const croppedFile = new File([blob], pathname, { type: "image/jpeg" });
      registerIcon(croppedFile);
    }, "image/jpeg");
  };

  return (
    <div className={styles.form_wrapper}>
      <p className={styles.close_button} onClick={() => setDisplay("none")}>
        閉じる
      </p>
      <form onSubmit={handleSubmit} className={styles.form}>
        <h3>プロフィール画像を設定</h3>
        <input
          type="file"
          accept="image/png, image/jpeg"
          onChange={changeInput}
          className={styles.file_input}
        />
        {image && (
          <>
            <div
              className={`crop_preview ${styles.crop_preview}`}
              style={{ width: "120px", float: "left", height: "120px" }}
            ></div>
            <div className={styles.button_container}>
              <button type="submit" className={styles.submit_button}>
                設定
              </button>
            </div>
            <div className={styles.cropper}>
              <Cropper
                ref={cropperRef}
                style={{ height: "100%", width: "100%" }}
                zoomTo={0}
                aspectRatio={1}
                preview=".crop_preview"
                src={image}
                viewMode={1}
                minCropBoxHeight={100}
                minCropBoxWidth={100}
                background={false}
                responsive={true}
                checkOrientation={false} // https://github.com/fengyuanchen/cropperjs/issues/671
                guides={true}
              />
            </div>
          </>
        )}
      </form>
    </div>
  );
};

export default AvatarIconForm;
