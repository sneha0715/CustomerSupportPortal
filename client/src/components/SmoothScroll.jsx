import  useSmoothScroll  from "../hooks/useSmoothScroll";

const SmoothScroll = ({ children, className = "" }) => {
  useSmoothScroll(".create-native-scroll");
  return (
    <div className={`overflow-y-scroll create-native-scroll ${className}`}>
      {children}
    </div>
  );
};

export default SmoothScroll;
