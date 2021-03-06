import React, {PropTypes, Component} from 'react';
import TinyMCE from 'react-tinymce';
import {Messages} from 'meteor/nova:core';
import {browserHistory} from 'react-router';
import {FlashContainer} from "meteor/nova:core";

class EditPageForm extends Component {

    constructor(props) {
        super(props);
        this.state = {
            content: props.document.content
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
        let self = this;

        let pageDocument = this.props.document;

        let modifier = {
            $set : {
                title : this.refs.pageTitle.value,
                slug : this.refs.pageSlug.value,
                menuInclude : this.refs.pageMenuInclude.value,
                menuWeight : this.refs.pageMenuWeight.value,
                content : this.state.content
            }
        };

        Meteor.call('pages.edit', pageDocument._id, modifier, function (error, result) {
            if(error) {
                Messages.clearSeen();
                Messages.flash(error.reason, 'error');
            } else {
                if(result) {
                    Messages.clearSeen();
                    Messages.flash('Page Edited', 'success');
                    browserHistory.push('/admin/pages');
                }
            }
        });

    }

    render() {

        let title = this.props.document.title,
            slug = this.props.document.slug,
            menuInclude = this.props.document.menuInclude,
            menuWeight = this.props.document.menuWeight,
            content = this.state.content;

        return (
            <div className="create-page-form">

                <form onSubmit={this.formSubmit}>

                    <div className="form-group">
                        <label htmlFor="page-title">Page Title</label>
                        <input defaultValue={title} ref="pageTitle" id="page-title" className="form-control" type="text" required />
                    </div>

                    <div className="form-group">
                        <label htmlFor="page-slug">Page Slug</label>
                        <input defaultValue={slug} ref="pageSlug" id="page-slug" className="form-control" type="text" required />
                    </div>

                    <div className="form-group">
                        <label htmlFor="menu-include">Include in Main Menu</label>
                        <select defaultValue={menuInclude} ref="pageMenuInclude" id="menu-include" required>
                            <option value="yes">Yes</option>
                            <option value="no">No</option>
                        </select>
                    </div>

                    <div className="form-group">
                        <label htmlFor="menu-weight">Menu Weight</label>
                        <input defaultValue={menuWeight} ref="pageMenuWeight" id="menu-weight" className="form-control" type="text" required />
                    </div>

                    <div className="form-group">
                        <label htmlFor="page-content">Content</label>
                        <TinyMCE
                            content={content}
                            config={{
                                plugins: 'autolink link image lists preview code',
                                toolbar: 'undo redo | styleselect | bold italic | alignleft aligncenter alignright | image link | code',
                                menubar: false,
                                statusbar: false,
                                height: '250px'
                            }}
                            onChange={this.handleEditorChange}
                        />
                    </div>

                    <input type="submit" className="btn btn-primary" value="Edit Page"/>
                </form>

            </div>
        );

    }

}

EditPageForm.displayName = "EditPageForm";

export default EditPageForm;