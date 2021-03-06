import React from 'react';
import Header from './Header';
import Card from './Card';
import '../../css/Table.css';

/* This component is the majority of the landing page, the table holding every card. */

export default class Table extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            loading: true,
            search: '',
            role: 'All Roles',
            ascending: true,
            menuOpen: false,
            active: '↓',
            champions: [],
            champData: []
        };
        this.handleTextChange = this.handleTextChange.bind(this);
        this.resetText = this.resetText.bind(this);
        this.resetTextOffFocus = this.resetTextOffFocus.bind(this);
        this.openRoleMenu = this.openRoleMenu.bind(this);
        this.selectRole = this.selectRole.bind(this);
        this.swapRating = this.swapRating.bind(this);
        this.sortChampions = this.sortChampions.bind(this);
    }

    // Make call to API to retrieve data for every champion
    componentDidMount() {
        var request = new XMLHttpRequest();
        request.open("GET", "https://api.champs.gg/api/champion/all");
        request.send();
        request.onreadystatechange = event => {
            if (event.target.readyState === 4 && event.target.status === 200 && event.target.responseText) {
                const response = JSON.parse(event.target.responseText);
                response.sort((a, b) => b.score - a.score)
                this.setState({ champData: response, champions: response, loading: false })
            }
        }
    }

    handleTextChange(value) {
        this.setState({
            search: value,
        }, () => {
            this.setState({
                champions: this.sortChampions(this.state.champData.slice()),
            })
        });
    }

    resetText() {
        if (this.state.search === 'Search by name...') {
            this.setState({
                search: '',
            })
        }
    }

    resetTextOffFocus() {
        if (this.state.search === '') {
            this.setState({
                search: 'Search by name...',
            });
        }
    }

    openRoleMenu() {
        this.setState({
            menuOpen: true,
        });
    }

    selectRole(role) {
        this.setState({
            role: role,
        }, () => {
            this.setState({
                champions: this.sortChampions(this.state.champData.slice()),
            })
        });
    }

    swapRating(e) {
        console.log(e.target.value)
        this.setState({
            ascending: e.target.value == "high",
        }, () => {
            this.setState({
                champions: this.sortChampions(this.state.champData.slice()),
            });
        });
    }

    // Combines all customization options to provide the final list of champions to display
    sortChampions(champions) {
        if (this.state.search !== '' && this.state.search !== 'Search by name...') {
            champions = champions.filter(champ => champ.name.toUpperCase().includes(this.state.search.toUpperCase()));
        }
        switch (this.state.role) {
            case 'Top':
                champions = champions.filter(champ => champ.roles.includes('Top'));
                break;
            case 'Jungle':
                champions = champions.filter(champ => champ.roles.includes('Jungle'));
                break;
            case 'Mid':
                champions = champions.filter(champ => champ.roles.includes('Mid'));
                break;
            case 'Bot':
                champions = champions.filter(champ => champ.roles.includes('Bot'));
                break;
            case 'Support':
                champions = champions.filter(champ => champ.roles.includes('Support'));
                break;
            default:
        }
        if (!this.state.ascending) {
            champions.sort((a, b) => a.score - b.score);
        } else {
            champions.sort((a, b) => b.score - a.score);
        }
        console.log(champions)
        return champions;
    }

    render() {
        if (this.state.loading) {
            return (
                <div className="text-center mb-5 pb-4">
                    <div className="table-loading"></div>
                </div>
            )
        }
        return (
            <div className="table">
                <Header
                    search={this.state.search} ascending={this.state.ascending}
                    menuOpen={this.state.menuOpen} active={this.state.active} handleTextChange={this.handleTextChange}
                    resetText={this.resetText} openRoleMenu={this.openRoleMenu} selectRole={this.selectRole}
                    swapRating={this.swapRating} page="main" resetTextOffFocus={this.resetTextOffFocus} role={this.state.role}
                />
                <div className="py-2 text-muted text-center" style={{ fontSize: "14px" }}>
                    Click on a champion to see their matchups. Vote on a champion's general strength by clicking one of the five tier buttons on their card.
                </div>
                <div className="row mx-0">
                    {this.state.champions.map((champion, i) =>
                        <Card key={champion.shortname} name={champion.name}
                            icon={"https://ddragon.leagueoflegends.com/cdn/10.1.1/img/champion/" + champion.shortname + ".png"}
                            roles={champion.roles.join(', ')} rating={champion.score.toFixed(2)} page="main"
                            champId={champion.shortname}
                            userVote={champion.userVote}
                        />
                    )}
                </div>
            </div>
        );
    }
}
