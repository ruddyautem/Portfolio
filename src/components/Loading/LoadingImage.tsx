
'use client';

import Image, { type ImageProps } from 'next/image';
import { useState } from 'react';
import { cn } from '@/lib/utils';

/**
 * Use inside a positioned image frame to preserve its composition while the image decodes.
 */
export const LoadingImage = ({ className, onLoad, onError, ...props }: ImageProps) => {
  const [isLoaded, setIsLoaded] = useState(false);

  return (
    <>
      {!isLoaded && (
        <div
          className="absolute inset-0 z-10 overflow-hidden bg-slate-950/80"
          aria-hidden="true"
        >
          <div className="loading-skeleton absolute inset-0" />
        </div>
      )}
      <Image
        {...props}
        loading={props.priority ? 'eager' : 'lazy'}
        suppressHydrationWarning
        className={cn(
          'transition-opacity duration-300',
          isLoaded ? 'opacity-100' : 'opacity-0',
          className,
        )}
        onLoad={(event) => {
          setIsLoaded(true);
          onLoad?.(event);
        }}
        onError={(event) => {
          setIsLoaded(true);
          onError?.(event);
        }}
      />
    </>
  );
};
