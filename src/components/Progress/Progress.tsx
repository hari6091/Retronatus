import { Progress as NBProgress } from "native-base";
import React, { useEffect, useRef, useState } from "react";
import { Animated } from "react-native";

import { IProgressProps } from "./types";

const Progress = ({ value: valueProp = 0, ...rest }: IProgressProps) => {
  const progress = useRef(new Animated.Value(0)).current;
  const [value, setValue] = useState(0);

  useEffect(() => {
    if (progress) {
      Animated.timing(progress, {
        toValue: valueProp,
        duration: Math.abs(((valueProp - value) / 10) * 500),
        useNativeDriver: true,
      }).start();
    }
  }, [valueProp]);

  useEffect(() => {
    let listenerId: string | undefined;

    if (progress) {
      listenerId = progress.addListener(({ value }) => {
        setValue(value);
      });
    }

    return () => {
      if (listenerId) {
        progress.removeListener(listenerId);
      }
    };
  }, []);

  return (
    <NBProgress
      colorScheme="#232831"
      value={value}
      rounded={0}
      bgColor="#777777"
      size="xs"
      {...rest}
    />
  );
};

export default Progress;
