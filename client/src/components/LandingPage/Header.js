import React from 'react';
import Search from './Search.js';
import RatingToggle from './RatingToggle.js';
import RoleToggle from './RoleToggle.js';
import '../../css/Header.css';

/* This component is the utility bar directly below the logo on the landing page. */

export default class Header extends React.Component {
    render() {
        return (
            <>
                <div className="px-2 px-lg-0">
                    <div className="row bg-white rounded py-2 text-center border mb-2 mx-0 col-lg-8 col-12 mx-lg-auto">
                        <div className="col-md-5 col-12 my-auto text-md-left text-center">
                            <Search
                                search={this.props.search}
                                handleTextChange={this.props.handleTextChange}
                                resetText={this.props.resetText}
                                resetTextOffFocus={this.props.resetTextOffFocus} />
                        </div>
                        <div className="col-md-7 col-12 text-right my-md-auto mt-md-auto mt-3 d-none d-md-block">
                            <div className="d-inline-block mr-2 align-middle">
                                <RoleToggle
                                    role={this.props.role}
                                    menuOpen={this.props.menuOpen}
                                    openRoleMenu={this.props.openRoleMenu}
                                    selectRole={this.props.selectRole} />
                            </div>
                            <div className="d-inline-block align-middle">
                                <RatingToggle
                                    active={this.props.active}
                                    ascending={this.props.ascending}
                                    swapRating={this.props.swapRating}
                                    text="Rating " />
                            </div>
                        </div>
                    </div>
                </div>
            </>
        );
    }
}
