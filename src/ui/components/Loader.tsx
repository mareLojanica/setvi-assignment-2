import { type FC, Suspense } from "react";
import Spinner from "./Spinner";

const Loader =
  <P extends object>(Component: FC<P>) =>
  (props: P) =>
    (
      <Suspense fallback={<Spinner />}>
        <Component {...props} />
      </Suspense>
    );

export default Loader;
