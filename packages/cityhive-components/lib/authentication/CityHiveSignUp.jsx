import React, {Component} from 'react';
import {Messages} from 'meteor/nova:core';
import {FlashContainer} from "meteor/nova:core";
import { Link } from 'react-router';

class CityHiveSignUp extends Component {

    constructor(props) {
        super(props);
        this.formSubmit = this.formSubmit.bind(this);
    }

    formSubmit(e) {
        let self = this;
        let fields = [
            'title',
            'firstName',
            'lastName',
            'email',
            'profession',
            'jobTitle',
            'firm',
            'department',
            'yearStarted',
            'password',
            'rePassword'
        ];
        let fieldsObj = {};

        Messages.clearSeen();

        fields.forEach((field) => {
            fieldsObj[field] = self.refs[field].value;
        });

        Meteor.call('cityhive.user.create', fieldsObj, function (error, result) {
            if(error) {
                Messages.clearSeen();
                Messages.flash(error.reason, 'error');
            } else {
                if(result) {
                    fields.forEach((field) => {
                       self.refs[field].value = '';
                    });
                    Messages.clearSeen();
                    Messages.flash('Account created. Please check your email for verification', 'success');
                }
            }
        });

        e.preventDefault();
    }

    getYearsRange() {
        // years range
        let currentYear = new Date().getFullYear(),
            startYear = 1950;
            years = [];
        while ( startYear <= currentYear ) {
            let year = startYear++;
            years.push(<option key={year} value={year}>{year}</option>)
        }
        return years;
    }

    render() {

        return (
            <div className="city-hive-sign-up">

                <p className="form-title">Join the network today</p>
                <small>All fields required</small>

                <form ref="signUp" onSubmit={this.formSubmit}>

                    <div className="form-item">
                        <select ref="title" id="title" required>
                            <option value="">Title</option>
                            <option value="miss">Miss</option>
                            <option value="mrs">Mrs</option>
                            <option value="ms">Ms</option>
                            <option value="mr">Mr</option>
                        </select>
                    </div>

                    <div className="form-item">
                        <input ref="firstName" type="text" placeholder="First name" required />
                    </div>

                    <div className="form-item">
                        <input ref="lastName" type="text" placeholder="Last name" required />
                    </div>

                    <div className="form-item work-email">
                        <input ref="email" type="email" placeholder="Email" required />
                        <small>We will use this email address for verification</small>
                    </div>

                    <div className="form-item">
                        <select ref="profession" id="profession" required>
                            <option value="">Profession</option>
                            <option value="asset-management">Asset Management</option>
                            <option value="investment-management">Investment Management</option>
                            <option value="private-banking">Private Banking</option>
                            <option value="wealth-management">Wealth Management</option>
                            <option value="other">Other</option>
                        </select>
                    </div>

                    <div className="form-item">
                        <input ref="jobTitle" type="text" placeholder="Job Title" required />
                    </div>

                    <div className="form-item">
                        <input ref="firm" id="firm" type="text" placeholder="Firm" required />
                    </div>

                    <div className="form-item">
                        <select ref="department" id="department" required>
                            <option value="">Department</option>
                            <option value="finance">Finance</option>
                            <option value="human-resources">Human Resources</option>
                            <option value="management">Management</option>
                            <option value="legal">Legal</option>
                            <option value="marketing-product-strategy">Marketing & Product Strategy</option>
                            <option value="operations-it">Operations & IT</option>
                            <option value="risk-compliance">Risk & Compliance</option>
                            <option value="sales-distribution">Sales & Distribution</option>
                            <option value="other">Other</option>
                        </select>
                    </div>

                    <div className="form-item">
                        <select ref="yearStarted" id="year-started" required>
                            <option value="">Year you started in industry</option>
                            {this.getYearsRange()}
                        </select>
                    </div>

                    <div className="form-item">
                        <input ref="password" type="password" placeholder="Create password" required />
                    </div>

                    <div className="form-item">
                        <input ref="rePassword" type="password" placeholder="Re-type password" required />
                    </div>

                    <div className="form-item">
                    <p className="note">By registering to be a member you agree to our <Link to="/terms">membership terms</Link>, read our <Link to="/privacy">privacy policy</Link> for details of how we shall store and use your data.</p>
                    </div>

                    <div className="form-item">
                        <input type="submit" value="Sign up"/>
                    </div>

                    <div className="form-item">
                        <p className="switch-to-sign-in">Already have an account? <Link to="/sign-in">Sign in</Link></p>
                    </div>

                </form>

            </div>
        )
    }

}

export default CityHiveSignUp