import {
  Children,
  ReactNode,
  RefObject,
  useEffect,
  useState,
  useSyncExternalStore,
} from "react";
import { createPortal } from "react-dom";

type RootNode = ShadowRoot | Document | Node;

interface PortalProps {
  children: ReactNode;
  disabled?: boolean | undefined;
  container?: RefObject<HTMLElement> | null | undefined;
}

export default function Portal({ children, disabled, container }: PortalProps) {
  const [resolvedContainer, setResolvedContainer] = useState(
    container?.current
  );

  useEffect(() => {
    setResolvedContainer(() => container?.current);
  }, [container]);

  const isServer = useSyncExternalStore(
    () => () => {},
    () => false, // Client
    () => true // Server
  );

  if (isServer || disabled) {
    return <>{children}</>;
  }

  const mountNode = resolvedContainer ?? getPortalNode(() => document);

  return (
    <>{Children.map(children, (child) => createPortal(child, mountNode))}</>
  );
}

const getPortalNode = (cb: () => RootNode) => {
  const node = cb?.();
  const rootNode = node.getRootNode();
  if (isShadowRoot(rootNode)) return rootNode;
  return getDocument(node).body;
};

function isShadowRoot(node: unknown): node is ShadowRoot {
  return typeof ShadowRoot !== "undefined" && node instanceof ShadowRoot;
}

function getDocument(node: Node): Document {
  return node?.ownerDocument ?? document;
}
