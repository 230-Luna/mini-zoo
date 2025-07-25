import { css, Global } from "@emotion/react";
import { ReactNode } from "react";
import { colors } from "./../constants/colors";
import { useBlockZoomChange } from "hooks/useBlockZoomChange";

export function GlobalStyle({ children }: { children: ReactNode }) {
  useBlockZoomChange();

  return (
    <>
      <Global
        styles={[resetCss, fontCss, backgroundCss, mobileTouchEventCss]}
      />
      {children}
    </>
  );
}

const resetCss = css`
  /* http://meyerweb.com/eric/tools/css/reset/ 
   v2.0 | 20110126
   License: none (public domain)
*/

  html,
  body,
  div,
  span,
  applet,
  object,
  iframe,
  h1,
  h2,
  h3,
  h4,
  h5,
  h6,
  p,
  blockquote,
  pre,
  a,
  abbr,
  acronym,
  address,
  big,
  cite,
  code,
  del,
  dfn,
  em,
  img,
  ins,
  kbd,
  q,
  s,
  samp,
  small,
  strike,
  strong,
  sub,
  sup,
  tt,
  var,
  b,
  u,
  i,
  center,
  dl,
  dt,
  dd,
  ol,
  ul,
  li,
  fieldset,
  form,
  label,
  legend,
  table,
  caption,
  tbody,
  tfoot,
  thead,
  tr,
  th,
  td,
  article,
  aside,
  canvas,
  details,
  embed,
  figure,
  figcaption,
  footer,
  header,
  hgroup,
  menu,
  nav,
  output,
  ruby,
  section,
  summary,
  time,
  mark,
  audio,
  video {
    margin: 0;
    padding: 0;
    border: 0;
    font-size: 100%;
    font: inherit;
    vertical-align: baseline;
  }
  /* HTML5 display-role reset for older browsers */
  article,
  aside,
  details,
  figcaption,
  figure,
  footer,
  header,
  hgroup,
  menu,
  nav,
  section {
    display: block;
  }
  body {
    line-height: 1;
  }
  ol,
  ul {
    list-style: none;
  }
  blockquote,
  q {
    quotes: none;
  }
  blockquote:before,
  blockquote:after,
  q:before,
  q:after {
    content: "";
    content: none;
  }
  table {
    border-collapse: collapse;
    border-spacing: 0;
  }
`;

const fontCss = css`
  @font-face {
    font-family: "Ownglyph_ParkDaHyun";
    src: url("https://fastly.jsdelivr.net/gh/projectnoonnu/2411-3@1.0/Ownglyph_ParkDaHyun.woff2")
      format("woff2");
    font-weight: normal;
    font-style: normal;
  }

  html,
  body,
  *,
  *::before,
  *::after {
    font-family: "Ownglyph_ParkDaHyun", "Tossface", sans-serif;
  }
`;

const backgroundCss = css`
  html,
  body {
    background-color: ${colors.peach50};
    overscroll-behavior: none;
  }
`;

const mobileTouchEventCss = css`
  * {
    -webkit-tap-highlight-color: transparent;
  }

  button,
  a,
  input,
  textarea {
    -webkit-tap-highlight-color: transparent;
    outline: none;
    touch-action: manipulation;
  }
`;
