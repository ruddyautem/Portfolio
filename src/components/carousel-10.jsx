"use client";

import * as React from "react";
import { cn } from "@/lib/utils";
import { Carousel, CarouselContent, CarouselItem, CarouselNext, CarouselPrevious } from "@/components/ui/carousel";

export default function SlideOpacity() {
  const [api, setApi] = React.useState();
  const [current, setCurrent] = React.useState(0);

  React.useEffect(() => {
    if (!api) {
      return;
    }

    setCurrent(api.selectedScrollSnap() + 1);

    api.on("select", () => {
      setCurrent(api.selectedScrollSnap() + 1);
    });
  }, [api]);

  return (
    <Carousel className="mx-2 w-full max-w-md" opts={{ loop: true }} setApi={setApi}>
      <div className="mask-x-from-90%">
        <CarouselContent>
          {images.map((image, index) => (
            <CarouselItem
              className={cn("basis-3/5 transition-opacity", {
                "opacity-30": index !== current - 1,
              })}
              key={image}>
              <img
                alt="depth-248"
                className="size-full rounded-xl object-cover"
                src={image} />
            </CarouselItem>
          ))}
        </CarouselContent>
      </div>
      <CarouselPrevious />
      <CarouselNext />
    </Carousel>
  );
}
