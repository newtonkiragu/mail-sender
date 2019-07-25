import React from "react";
import {Form, Button} from "react-bootstrap";
class emailForm extends React.Component {
    constructor(props) {
        super(props);
        this.state = {emails: ''};

        this.handleChange = this.handleChange.bind(this);
        this.handleSubmit = this.handleSubmit.bind(this);
    }

    handleChange(event) {
        this.setState({emails: event.target.value.split(", ")});
    }

    handleSubmit(event) {
        alert('The following emails were submitted: ' + this.state.emails);
        event.preventDefault();
    }

    render() {
        return (
            <Form onSubmit={this.handleSubmit}>
                <Form.Group controlId="formBasicEmail">
                    <Form.Label>Pod email addresses</Form.Label>
                    <Form.Control type="text" value={this.state.emails} onChange={this.handleChange} placeholder="input emails separated by commas: example@email.com, email2@email.com"/>
                    <Form.Text className="text-muted">
                        Ensure your emails are moringaschool emails.
                    </Form.Text>
                </Form.Group>



                <Button type="submit">Submit</Button>
            </Form>
        );
    }
}
export default emailForm;