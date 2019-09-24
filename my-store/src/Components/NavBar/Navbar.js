import React from 'react';

class Navibar extends React.Component {
    render() {
        const NavItem = props => {
            const pageURI = window.location.pathname + window.location.search
            const liClassName = (props.path === pageURI) ? "nav-item active" : "nav-item";
            const aClassName = props.disabled ? "nav-link disabled" : "nav-link"
            return (
                <li className={liClassName}>
                    <a href={props.path} className={aClassName}>
                        {props.name}
                        {(props.path === pageURI) ? (<span className="sr-only">(current)</span>) : ''}
                    </a>
                </li>
            );
        }

        return (
            <nav className="navbar navbar-expand-lg navbar-light bg-light">
                <a className="navbar-brand" href="/">Store</a>
                <button className="navbar-toggler" type="button" data-toggle="collapse" data-target="#navbarSupportedContent" aria-controls="navbarSupportedContent" aria-expanded="false" aria-label="Toggle navigation">
                    <span className="navbar-toggler-icon"></span>
                </button>

                <div className="collapse navbar-collapse" id="navbarSupportedContent">
                    <ul className="navbar-nav mr-auto">
                        <NavItem path="/" name="Home" />
                        <NavItem path="/page2" name="Page2" />
                        <NavItem path="/page3" name="Disabled" disabled="true" />

                    </ul>
                </div>
                <div className='navbar-right'>
                    <ul className="navbar-nav mr-auto">
                        <NavItem path="/login" name='Log In' />
                        <NavItem path="/registration" name='Rgistration' disabled="true"/>
                    </ul>

                </div>
            </nav>
        )
    }
}

export default Navibar;