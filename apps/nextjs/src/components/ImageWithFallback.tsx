import React, { useState } from "react";
import Image from "next/image";

const ImageWithFallback = (props: any) => {
  const { src, fallbackSrc, ...rest } = props;
  const [imgSrc, setImgSrc] = useState(src);

  return (
    <Image
      {...rest}
      src={imgSrc}
      onError={() => {
        console.log("ERROR");
        setImgSrc(fallbackSrc);
      }}
      alt=""
    />
  );
};

export default ImageWithFallback;
