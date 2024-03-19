
import Nav from 'react-bootstrap/Nav';

function AdminNav() {


  return (
    <Nav fill variant="tabs" defaultActiveKey="/home">
      <Nav.Item>
        <Nav.Link >Users</Nav.Link>
      </Nav.Item>
      <Nav.Item>
        <Nav.Link>Balance Request</Nav.Link>
      </Nav.Item>
      <Nav.Item>
        <Nav.Link>Recharge Request</Nav.Link>
      </Nav.Item>
      <Nav.Item>
        <Nav.Link>Withdraw Request</Nav.Link>
      </Nav.Item>
      <Nav.Item>
        <Nav.Link>Setting</Nav.Link>
      </Nav.Item>
    </Nav>
  );
}

export default AdminNav;