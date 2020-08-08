import React, { useState, useEffect } from 'react';

import { toBase64 } from "../../../helpers/helpers";

export default function PresentationImageItem({ img }) {
    const [imgBase64, setImgBase64] = useState(null);

    useEffect(() => {
        if (img) {
            toBase64(img).then(res => {
                setImgBase64(res);
            });
        }
    }, [img]);

    return (
        <img src={imgBase64} alt="presentation" className="images-list-img" />
    )
};