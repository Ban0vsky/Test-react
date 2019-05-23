import React, {Component} from 'react';
import {Button, PopUp} from '../../components';
import {NavLink} from 'react-router-dom';

import './Plans.css';

class Plans extends Component {
  state = {
    finishPathPopUp: false,
    paymentConfirmPopUp: false,
    unsubscribePopUp: false,
    planSelected: null,
    plans: [
      {'id': 0, 'name': 'Kaspr Ghost', 'credit': 5, 'limitShare': 0, 'important': false, 'price': 0, 'permissions': []},
      {'id': 1, 'name': 'Kaspr Basic', 'credit': 50, 'limitShare': 0, 'important': false, 'price': 39, 'permissions': ['bulks']},
      {'id': 2, 'name': 'Kaspr Pro', 'credit': 250, 'limitShare': 4, 'important': true, 'price': 99, 'permissions': ['bulks', 'leadsManagement']},
      {'id': 3, 'name': 'Kaspr Gold', 'credit': 1000, 'limitShare': 9, 'important': false, 'price': 299, 'permissions': ['bulks', 'leadsManagement', 'leadsExport']},
      {'id': 4, 'name': 'Kaspr Ultimate', 'credit': 5000, 'limitShare': 19, 'important': false, 'price': 499, 'permissions': ['bulks', 'leadsManagement', 'leadsExport']}
    ],
    ownedPlan: localStorage.getItem('ownedPlan') ? JSON.parse(localStorage.getItem('ownedPlan')) : {'id': 0, 'name': 'Kaspr Ghost', 'credit': 5, 'limitShare': 0, 'important': false, 'price': 0, 'permissions': []}
  };

  /**
   * SELECT PLAN
   */
  handleSelectPlan = (planSelected, unsubscribe) => {
    if (unsubscribe) {
      this.setState({unsubscribePopUp: true});
      return;
    }
    this.setState({paymentConfirmPopUp: true, planSelected});
  };

  handleConfirmPurchase = async () => {
    //upgrade
    if (this.state.planSelected.id > this.state.ownedPlan.id) {
      //verify if the selected plan have leadsMangement permission
      if (this.state.planSelected.permissions.indexOf('leadsManagement') > -1) {
        window.location = '/team';
      }
    } else {
      //downgrade
    }
    await  this.setState({ownedPlan: this.state.planSelected, paymentConfirmPopUp: false, planSelected: null});
    localStorage.setItem('ownedPlan', JSON.stringify(this.state.ownedPlan));
  };

  handleClosePopUp = () => {
    this.setState({
      paymentConfirmPopUp: false,
      unsubscribePopUp: false
    });
  };

  handleUnsubscribe = async () => {
    await this.setState({unsubscribePopUp: false, ownedPlan: this.state.plans.filter(plan => plan.id == 0)[0]});
    localStorage.setItem('ownedPlan', JSON.stringify(this.state.ownedPlan));
  };

  render() {
    return (
      <section className="subscription">
        <div className="offers">
          {this.state.plans &&
          this.state.plans.map((plan, i) => {
            return (
              <div key={i}>

                {plan.important && (
                  <span className="mostpop">
										Le plus populaire
										</span>
                )}

                <article>
                  <h2>{plan.name} </h2>
                  <p>
                    <strong> {plan.price}</strong>€/mois
                  </p>
                  <span>
											{/* <img src="assets/img/addcoin.svg"
                           alt="coin"/> */}
                            {plan.credit} credits/mois
                            {plan.permissions.indexOf('bulks') >-1 && (<div>Accès aux Bulks</div>)}
                            {plan.permissions.indexOf('leadsManagement') >-1 && (<div>Leads management</div>)}
                            {plan.permissions.indexOf('leadsExport') >-1 && (<div>Leads exports</div>)}
										</span>
                  <small>
                    Jusqu'a {plan.limitShare + 1} utilisateur{' '} 
                    {plan.permissions.indexOf('bulks') == -1 && (<div>Pas d'accès aux Bulks</div>)}
                    {plan.permissions.indexOf('leadsManagement') == -1 && (<div>Pas de Leads management</div>)}
                    {plan.permissions.indexOf('leadsExport') == -1 && (<div>Pas de Leads exports</div>)}
                  </small>
                  
                  {this.state.ownedPlan.id === plan.id ?//actual plan
                   plan.id == '0' ?//(actual plan) free plan
                   (
                     <Button
                       value="Actuel"
                       className="btnSelected"
                     />
                   ) ://(actual plan) premium plan
                   (
                     <Button
                       value="désabonner"
                       className="btnSelected"
                       onClick={() => this.handleSelectPlan(plan, true)}
                     />
                   )
                    ://another plan
                   (
                     this.state.ownedPlan.id > plan.id ?(
                     <Button
                       value="downgrade"
                       className="btn"
                       onClick={() => this.handleSelectPlan(plan, false)}
                     />
                     ):
                     <Button
                       value="upgrade"
                       className="btn"
                       onClick={() => this.handleSelectPlan(plan, false)}
                     />
                   )}
                </article>
              </div>
            );
          })}
        </div>

        {this.state.unsubscribePopUp && (
          <PopUp setToggle={this.handleClosePopUp}>
            <div className="popUpError">
              <h2 className="unsubscribeText">
                Êtes-vous sur de vouloir supprimer votre abonnement ?
                
              </h2>
              <img className="sadGhost" src="assets/img/0.png"alt="sadghost"/>
              <Button
                className="btn"
                value="Se désabonner"
                onClick={this.handleUnsubscribe}
              />
            </div>
          </PopUp>
        )}

        {this.state.paymentConfirmPopUp &&
        this.state.planSelected && (
          <PopUp setToggle={this.handleClosePopUp}>
            <div className="popUpError">
              <h2>Votre choix contient:</h2>
              <p>
                 • <strong>{this.state.planSelected.credit}</strong> crédits utilisable sur notre plateforme
              </p>
              <p>
                • Un compte utilisable par <strong>{this.state.planSelected.limitShare + 1}</strong> personnes
              </p>
              {this.state.planSelected.permissions.indexOf('bulks') >-1 && (<p>• L'accès aux fonctionnalités <strong>Bulks</strong></p>)}
              {this.state.planSelected.permissions.indexOf('leadsManagement') >-1 && (<p>• La possibilité de <strong>gérer vos leads</strong></p>)}
              {this.state.planSelected.permissions.indexOf('leadsExport') >-1 && (<p>• La possibilité de <strong>télécharger vos leads</strong></p>)}
              <div className="priceConf">Vous paierez <strong>{this.state.planSelected.price}€</strong> par mois jusqu'à résilliation.</div>

              {this.state.ownedPlan.id > this.state.planSelected.id ?(
                     <Button
                       value="downgrade"
                       className="btn"
                       onClick={this.handleConfirmPurchase}
                     />
                     ):
                     <Button
                       value="upgrade"
                       className="btn"
                       onClick={this.handleConfirmPurchase}
                     />
                   }
            </div>
          </PopUp>
        )}
      </section>
    );
  }
}

export default Plans;
