import React from 'react';
import '../../css/Row.css';

export default class Row extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            name: this.props.name,
            icon: this.props.icon,
            roles: this.props.roles,
            rating: this.props.rating,
            voteLoading: [false, false, false, false, false]
        };
    }

    ratingToTier(rating) {
        return "S"
    }

    vote(rating) {
        let { voteLoading } = this.state;
        voteLoading[rating - 1] = true;
        this.setState({ voteLoading });
        var request = new XMLHttpRequest();
        request.open("POST", "/api/vote/champion");
        request.setRequestHeader('Content-type', 'application/json');
        request.send(JSON.stringify({
            championId: this.props.champId,
            score: rating
        }));
        request.onreadystatechange = event => {
            if (event.target.readyState === 4) {
                voteLoading[rating - 1] = false;
                this.setState({ voteLoading });
                if (event.target.status === 200) {

                }
                else {
                    alert(event.target.responseText)
                }
            }
        }
    }

    render() {
        return (
            <div className="col-3 px-2 my-2">
                <div class="card">
                    <div className="m-2">
                        <div className="d-inline-block align-middle">
                            <a href={this.props.champId}>
                                <img
                                    className="mr-3"
                                    style={{ "max-height": "60px", "border-radius": "50%" }}
                                    src={this.state.icon}
                                    alt={this.state.name}
                                />
                            </a>
                        </div>
                        <div className="d-inline-block align-middle">
                            <a href={this.props.champId} className="champ-name h4 text-dark">{this.state.name}</a>
                            <span class="d-block small text-muted text-uppercase">{this.state.roles}</span>
                        </div>
                    </div>


                    <ul class="list-group list-group-flush">
                        <li class="list-group-item border-top">
                            <div class="row">
                                <div class="col-2">
                                    <div className="champ-rating-solid">
                                        {this.ratingToTier(this.state.rating)}
                                    </div>
                                </div>
                                <div class="col-10 text-right">
                                    <div
                                        onClick={() => this.vote(5)}
                                        className={this.state.voteLoading[4] ? "champ-rating-loading" : "champ-rating"}
                                    >
                                        S
                                    </div>
                                    <div
                                        onClick={() => this.vote(4)}
                                        className={this.state.voteLoading[3] ? "champ-rating-loading" : "champ-rating"}
                                    >
                                        A
                                    </div>
                                    <div
                                        onClick={() => this.vote(3)}
                                        className={this.state.voteLoading[2] ? "champ-rating-loading" : "champ-rating"}
                                    >
                                        B
                                    </div>
                                    <div
                                        onClick={() => this.vote(2)}
                                        className={this.state.voteLoading[1] ? "champ-rating-loading" : "champ-rating"}
                                    >
                                        C
                                    </div>
                                    <div
                                        onClick={() => this.vote(1)}
                                        className={this.state.voteLoading[0] ? "champ-rating-loading" : "champ-rating"}
                                    >
                                        D
                                    </div>
                                </div>
                            </div>
                        </li>
                    </ul>

                </div>
            </div>
        );
    }
}