"use client";
import React, { useState, createRef, ChangeEvent } from "react";
import Cropper, { ReactCropperElement } from "react-cropper";
import "cropperjs/dist/cropper.css";
const TEST = () => {
  const [file, setFile] = useState<File | null>(null);
  const [pathname, setPathname] = useState("");
  const cropperRef = createRef<ReactCropperElement>();

  const [image, setImage] = useState<string | null>(null);

  const changeInput = (e: ChangeEvent<HTMLInputElement>) => {
    const f = e.currentTarget.files;
    if (!f || f.length === 0) return;
    setFile(f[0]);
    const reader = new FileReader();
    reader.addEventListener("load", () => {
      setImage(reader.result as string);
    });
    reader.readAsDataURL(f[0]);
  };

  return (
    <div>
      <form>
        <h3>プロフィール画像を設定</h3>
        <input type="file" onChange={changeInput} />
        <div className="crop_preview"></div>
        {image && (
          <div style={{ width: 240, height: 240 }}>
            <Cropper
              ref={cropperRef}
              style={{ height: "100%", width: "100%" }}
              zoomTo={0}
              initialAspectRatio={1}
              aspectRatio={1}
              preview=".crop_preview"
              src={image}
              viewMode={1}
              minCropBoxHeight={100}
              minCropBoxWidth={100}
              background={false}
              responsive={true}
              autoCropArea={1}
              checkOrientation={false} // https://github.com/fengyuanchen/cropperjs/issues/671
              guides={true}
            />
          </div>
        )}
        <div>
          <button type="submit">設定</button>
        </div>
      </form>
    </div>
  );
};

export default TEST;
