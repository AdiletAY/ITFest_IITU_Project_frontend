import { LucideLoader } from 'lucide-react';
import { useEffect } from 'react';

type LoadingIndicatorPropsType = {
  loaderCSSClasses?: string;
  parentCSSClasses?: string;
  containerCSSClasses?: string;
  fullScreen?: boolean;
  fullWidth?: boolean;
  inButton?: boolean;
  size?: 25 | 50 | 100;
};

const LoadingIndicator = ({
  loaderCSSClasses = '',
  parentCSSClasses = '',
  containerCSSClasses = '',
  fullScreen = false,
  fullWidth = false,
  inButton = false,
  size = fullScreen || fullWidth ? 100 : inButton ? 25 : 50,
}: LoadingIndicatorPropsType) => {
  useEffect(() => {
    if (fullScreen) {
      document.body.style.overflow = 'hidden';
      document.body.style.cursor = 'wait';
      return () => {
        document.body.removeAttribute('style');
      };
    }
  }, []);

  return (
    <div
      className={`${fullScreen && 'flex w[100%] h-screen justify-center'} ${
        fullWidth && 'flex w[100%] justify-center py-10'
      } ${
        !fullScreen && !fullWidth && 'w-max inline-block'
      } cursor-wait ${containerCSSClasses}`}
    >
      <div
        className={`w-fit aspect-square ${
          fullScreen && 'flex items-center justify-center'
        } ${parentCSSClasses}`}
      >
        <LucideLoader
          width={size}
          height={size}
          className={`opacity-75 h-full ${
            inButton ? 'text-inherit mr-2' : 'text-muted-foreground'
          } animate-spin ease-in-out ${loaderCSSClasses}`}
        />
      </div>
    </div>
  );
};

export default LoadingIndicator;
