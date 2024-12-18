'use client';

import { useEffect, useState } from 'react';
import { z } from 'zod';

const _TextProps = z.object({
  name: z.string().max(3, { message: '最大三位数' }).optional(),
}).optional();

type TextProps = z.infer<typeof _TextProps>;

export default function Text(props: TextProps) {
  const [name, setName] = useState<TextProps>(props);

  useEffect(() => {
    setName({
      name: '6789',
    });
  }, []);

  useEffect(() => {
    const { success, error } = _TextProps.safeParse(name);
    if (!success) {
      console.log(_TextProps.safeParse(name));
      console.log(error.format());
    }
  }, [name]);

  return (
    <div>{name?.name}</div>
  );
}
