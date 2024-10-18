import { dotSpinner } from "ldrs";

function LoadingComponent() {
  // Register the dot spinner to make it available for use
  dotSpinner.register();

  return (
    <div className="flex justify-center items-center h-[40vh]">
      {/* Dot spinner for loading indication */}
      <l-dot-spinner size="60" stroke="5" speed="0.9" color="grey"></l-dot-spinner>
    </div>
  );
}

export default LoadingComponent;
