import React, { useState, useRef, useEffect, MutableRefObject } from 'react';

interface WrappedComponentProps {
  open: Boolean;
  setOpen: Function;
  ref: MutableRefObject<HTMLDivElement | null>;
}

export default function withClickOutside<P extends {}>(
  WrappedComponent: React.FC<P & WrappedComponentProps>,
) {
  const Component = (props: P) => {
    const [open, setOpen] = useState(false);

    const ref = useRef<HTMLDivElement>(null);

    useEffect(() => {
      const handleClickOutside = (event: { target: any }) => {
        if (!ref?.current?.contains(event.target)) {
          setOpen(false);
        }
      };
      document.addEventListener('mousedown', handleClickOutside);
    }, [ref]);

    return (
      <WrappedComponent {...props} open={open} setOpen={setOpen} ref={ref} />
    );
  };

  return Component;
}
