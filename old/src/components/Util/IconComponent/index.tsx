import { SvgIcon, Tooltip } from "@material-ui/core";
import React from "react";
import { IconDictonary } from "../../../dictionaries";
import { IconTypes } from "../../../dictionaries/types";

interface Props {
  iconType: IconTypes;
  height?: string;
  width?: string;
  clickable?: boolean;
  disabled?: boolean;
  helper?: string;
  disabledHelper?: string;
}

const IconComponent = ({
  iconType,
  width,
  height,
  clickable,
  disabled,
  helper,
  disabledHelper,
  ...rest
}: Props) => {
  const IconComponentDynamic = IconDictonary[iconType as IconTypes];

  let helperMessage: string;

  if (disabledHelper && disabled) {
    helperMessage = disabledHelper;
  } else if (helper && !disabled) {
    helperMessage = helper;
  } else {
    helperMessage = "";
  }

  return (
    <div style={{ position: "relative", display: "flex" }}>
      <Tooltip arrow title={helperMessage}>
        <SvgIcon
          style={{
            width: `${width ? width : "1em"}`,
            height: `${height ? height : "1em"}`,
            cursor: `${clickable && !disabled ? "pointer" : "not-allowed"}`,
            color: `${disabled ? "#bdbdbd" : "inherit"}`,
            transition: "all 0.5s ease",
          }}
          {...rest}
          component={IconComponentDynamic}
        ></SvgIcon>
      </Tooltip>
    </div>
  );
};

export default IconComponent;
