import { Col, Container, Row } from 'react-bootstrap'

const FormContainer = ({ children }) => {
  return (
    <Container>
      <Row className='justify-content-md-center'>
        <Col md={6} sm={12}>
          {children}
        </Col>
      </Row>
    </Container>
  )
}

export default FormContainer
