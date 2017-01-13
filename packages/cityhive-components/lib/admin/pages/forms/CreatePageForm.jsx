import React, {PropTypes, Component} from 'react';
import TinyMCE from 'react-tinymce';
import {Messages} from 'meteor/nova:core';
import {FlashContainer} from "meteor/nova:core";
import {browserHistory} from 'react-router';

class CreatePageForm extends Component {

    constructor(props) {
        super(props);
        this.state = {
            content: ''
        };
        this.formSubmit = this.formSubmit.bind(this);
        this.handleEditorChange = this.handleEditorChange.bind(this);
    }

    handleEditorChange(e) {
        this.setState({
            content: e.target.getContent()
        })
    }

    formSubmit(e) {
        e.preventDefault();

        let pageDocument = {
            title: this.refs.pageTitle.value,
            slug: this.refs.pageSlug.value,
            menuInclude: this.refs.pageMenuInclude.value,
            menuWeight: this.refs.pageMenuWeight.value,
            content: this.state.content
        };

        Meteor.call('pages.create', pageDocument, function (error, result) {
            if(error) {
                Messages.clearSeen();
                Messages.flash(error.reason, 'error');
            } else {
                if(result) {
                    Messages.clearSeen();
                    Messages.flash('Page Created', 'success');
                    browserHistory.push('/admin/pages');
                }
            }
        });

    }

    render(props, context) {

        return (
            <div className="create-page-form">

                <form onSubmit={this.formSubmit}>

                    <div className="form-group">
                        <label htmlFor="page-title">Page Title</label>
                        <input ref="pageTitle" id="page-title" className="form-control" type="text" required />
                    </div>

                    <div className="form-group">
                        <label htmlFor="page-slug">Page Slug</label>
                        <input ref="pageSlug" id="page-slug" className="form-control" type="text" required />
                    </div>

                    <div className="form-group">
                        <label htmlFor="menu-include">Include in Main Menu</label>
                        <select ref="pageMenuInclude" id="menu-include" required>
                            <option value="yes">Yes</option>
                            <option value="no">No</option>
                        </select>
                    </div>

                    <div className="form-group">
                        <label htmlFor="menu-weight">Menu Weight</label>
                        <input ref="pageMenuWeight" id="menu-weight" className="form-control" type="text" required />
                    </div>

                    <div className="form-group">
                        <label htmlFor="page-content">Content</label>
                        <TinyMCE
                            content={this.state.content}
                            config={{
                                plugins: 'autolink link image lists preview',
                                toolbar: 'undo redo | bold italic | alignleft aligncenter alignright | image link',
                                menubar: false,
                                statusbar: false
                            }}
                            onChange={this.handleEditorChange}
                        />
                    </div>

                    <input type="submit" value="Create Page"/>
                </form>

            </div>
        );

    }

}

CreatePageForm.displayName = "CreatePageForm";

export default CreatePageForm;