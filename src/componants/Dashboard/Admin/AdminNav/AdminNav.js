
import Nav from 'react-bootstrap/Nav';

function AdminNav() {


  return (
    <Nav fill variant="tabs" defaultActiveKey="/home">
      <Nav.Item>
        <Nav.Link href="/home">Users</Nav.Link>
      </Nav.Item>
      <Nav.Item>
        <Nav.Link eventKey="link-1">Balance Request</Nav.Link>
      </Nav.Item>
      <Nav.Item>
        <Nav.Link eventKey="link-2">Recharge Request</Nav.Link>
      </Nav.Item>
      <Nav.Item>
        <Nav.Link eventKey="link-2">Withdraw Request</Nav.Link>
      </Nav.Item>
      <Nav.Item>
        <Nav.Link eventKey="link-2">Setting</Nav.Link>
      </Nav.Item>
    </Nav>
  );
}

export default AdminNav;