import { createElement } from "react";

const Fade = ({children, open}) => {
  return createElement(children.type, {...children.props, className: children.props.className ? children.props.className + ` fade${open ? ' show-fade' : ''}` : `fade${open ? ' show-fade' : ''}`});
}

export default Fade;
