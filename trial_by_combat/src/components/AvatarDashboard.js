import React from "react";

import Avatar from "./listings/Avatar";

class AvatarDashboard extends React.Component {
  constructor(props) {
        super(props) 
        this.state = {value: "",
        };
    } 
  render() {
        if (this.props.visComponent === 'AvatarDashboard') {
           
            return (
                <div class="table-responsive justify-content-center">
                    <table class="table">


                    <thead>
                            <tr>
                                <th>Name</th><th>Str</th><th>Dex</th><th>Con</th><th>Int</th><th>Wis</th><th>Cha</th><th>Gold</th><th>Health</th><th>Max Health</th>
                            </tr>
                        </thead>
                        <tbody>
                            <tr>
                                <td>{this.props.selectedAvatar.props.avatarName}</td>
                                <td>{this.props.selectedAvatar.props.strength}</td>
                                <td>{this.props.selectedAvatar.props.dexterity}</td>
                                <td>{this.props.selectedAvatar.props.constitution}</td>
                                <td>{this.props.selectedAvatar.props.intelligence}</td>
                                <td>{this.props.selectedAvatar.props.wisdom}</td>
                                <td>{this.props.selectedAvatar.props.charisma}</td>
                                <td>{this.props.selectedAvatar.props.gold}</td>
                                <td>{this.props.selectedAvatar.props.currentHealth}</td>
                                <td>{this.props.selectedAvatar.props.maximumHealth}</td>
                            </tr>
                        </tbody>



                       
                    </table>
                </div>           
            );
        }
        else {
            return (
                <div hidden></div>
            );
        }
    }

}

export default AvatarDashboard;

