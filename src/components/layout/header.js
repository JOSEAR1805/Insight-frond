import { Layout, Row, Col, Avatar, Tooltip,  Drawer, Card, Alert, notification, Badge, } from "antd";
import { UserOutlined, BellOutlined, LoginOutlined } from "@ant-design/icons";
import React, { useEffect, useState } from "react";
import { useRouter } from "next/router";
import axios from "axios";

const { Header } = Layout;

const HeaderApp = () => {
  const [user, setUser] = useState(null);
  const [image, setImage] = useState();
  const [notifications, setNotifications] = useState([]);
  const [count, setCount] = useState(0);

  const router = useRouter();
  
  const [visible, setVisible] = useState(false);
  const showDrawer = () => {
    setVisible(true);

    
  };
  const onClose = () => {
    setVisible(false);
  };

  const getNotifications = async () => {
    await axios
    .get("https://insightcron.com/users/tender-users/", {
      headers: {
        Authorization: `Token ${JSON.parse(localStorage.getItem("user")).token}`,
      },
    })
    .then( response => {
      if (response && response.data?.tenders) {
        setCount(response.data?.tenders.length)
        setNotifications(response.data?.tenders);
      }
    })
    .catch((err) => {
      console.log(err)
    });
  }

  const handleClose = async (tender) => {
    tender.tender_viewed = true;
    // console.log('***************', tender)

    let data = {
      tender_viewed: 1,
    }
    await axios
      .put(`https://insightcron.com/tenders/${tender.id}/`, data)
      .then((resp) => {
        console.log('resp', resp)
      })
      .catch((err) => {
        console.log(err)
        // notification.error({
        //   message: 'Error al editar Usuario!!',
        //   placement: 'bottomRight',
        // });
      });
  }

  useEffect(() => {
    if (process.browser) {
      setUser(JSON.parse(localStorage.getItem("user")));
      getNotifications();
    }
  }, []);

  return (
    <Header>
      <Row justify="end" gutter={[16, 0]}>
        <Col>
          <Tooltip title="Notificaciones!" color={"gold"} onClick={showDrawer}>
            
             <Badge count={count} overflowCount={9}>
             <BellOutlined
              twoToneColor="#ff0000"
              style={{ fontSize: "18px", paddingTop: "12px" }}
            />
              </Badge>

          </Tooltip>
        </Col>
        <Col>
          {`${user?.first_name} ${user?.last_name}`}
        
        </Col>
        <Col>
          { user?.image? <Avatar src={atob(user?.image).replace(" ", /\+/g)}/> : <Avatar icon={<UserOutlined />} />}
        </Col>
        <Col>
          <Tooltip title="Cerrar sesión" color={"gold"}>
            <LoginOutlined
              twoToneColor="#ff0000"
              onClick={() => {
                if (process.browser) {
                  localStorage.removeItem("user");
                  router.push("/login");
                }
              }}
              style={{ fontSize: "18px", paddingTop: "12px" }}
            />
          </Tooltip>
        </Col>
      </Row>
      <Drawer
        title="¡Notificaciones!"
        placement="right"
        closable={false}
        onClose={onClose}
        visible={visible}
      >
        {
          notifications.map((item) => {
            if (item.tender_viewed == false) {
              return (
                <Alert message="Licitación" key={item.id} description={item.description} type="success" afterClose={ () => handleClose(item)} closable style={{ marginBottom: '5px' }}/>
              )
            }
          })
        }
        
        {/* afterClose={handleClose} */}

      </Drawer>
    </Header>
  );
};

export default HeaderApp;
