import React from "react";

import Weapon from "./listings/Weapon";

class WeaponMarketplace extends React.Component {
  constructor(props) {
        super(props) 
        this.state = {value: "",
            weapons: ["No weapons to display"]
        };
        this.fetchWeapons = this.fetchWeapons.bind(this);          
        this.fetchWeapons();

    }

    
  fetchWeapons = async () => {
    let weaponArray = [];

    const settings = {
        method: 'GET',
        headers: {
            Accept: 'application/json',
            'Content-Type': 'application/json',
            Authorization: `Bearer ${this.props.authToken}`
        }
    };
    try {
        const fetchResponse = await fetch(`${this.props.server}/trial-by-combat/weapon/all`, settings);
        const data = await fetchResponse.json();
        let i = 0;
        data.forEach((weapon) => {
            weaponArray.push( <Weapon weaponName = {weapon.itemname} description = {weapon.description} damageDie = {weapon.damageDie} 
                damageBonus = {weapon.damageBonus} price = {weapon.price} avatar = {this.props.selectedAvatar} id = {weapon.id} server = {this.props.server} authToken = {this.props.authToken} key = {i} /> );
            i++;
          
        })
        
        this.setState({weapons:weaponArray});
        

    } catch (e) {
        console.log(e);
    }     
  }

  returnToAvatarList = () => {
    this.props.parentCallback('AvatarList');
}

  render() {
        if (this.props.visComponent === 'WeaponMarketplace') {
           
            return (
                <div class="col d-flex justify-content-center">
                    <table class='table'>
                        <thead><tr><th>Available Weapons</th></tr>
                        <tr><th>Weapon Name</th><th>Description</th><th>Damage Die</th><th>Damage Bonus</th><th>Price</th></tr>
                        </thead>
                        <tbody>
                            {this.state.weapons}
                        </tbody>
                    </table>
                    <a onClick = {this.returnToAvatarList}>Return to Avatar List</a>
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

export default WeaponMarketplace;