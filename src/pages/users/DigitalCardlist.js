import React from 'react';
import { useList, HttpError } from "@refinedev/core";
import { Card, Avatar,Row,Col, Divider } from 'antd';
import { UserOutlined, SolutionOutlined } from '@ant-design/icons'; // Import the SolutionOutlined icon
import './DigitalCardlist.css'

const UserIdCard = ({ user, cardIndex }) => {
  const { username, email, photo } = user;
  const gender = user?.sex;
  const title = gender && gender === 'female' ? 'Ms' : 'Mr';
  const avatarUrl = photo?.formats?.thumbnail?.url;
  const addresses = user?.addresses;
  console.log("addresssss",addresses)

  return (
    <Card className="user-card" style={{ width: '100%', marginBottom: '1rem' }}>
      <div className="card-content">
        <h3 className="card-title">
          <SolutionOutlined className="icon" />
          <b className="card-heading">EntryPass</b>
        </h3>
        
        <br />
        <h4 className="card-subtitle">
          <b>Carrier Counselling Program </b>
          {/* {cardIndex + 1}  */}
        </h4>
        <br />
        <h4 className="card-date">Date: 27th Aug 2023</h4>
        <br />
        <Card.Meta
          avatar={<Avatar src={avatarUrl} icon={<UserOutlined />} />}
          title={`${title} ${username}`}
        />
        <div className="user-details">
          <p>
            <b>Father:</b> {user.father}
          </p>
          <p>
            <b>Class:</b> {user.class}
          </p>
          <p>
            <b>Mobile:</b> {user.mobile}
          </p>
          <p>
            <b>Email:</b> {email}
          </p>
         
          {addresses !== null ? (
            <div>
            <Divider />
              {addresses.length > 0 ? (
                addresses.map((address, index) => (
                  <div key={index}>
                    <p>
                      <b>Address Type:</b> {address.addresstype}
                    </p>
                    <p>
                      <b>Street:</b> {address.housename}, {address.village}
                    </p>
                    <p>
                      <b>City:</b> {address.district}
                    </p>
                    <p>
                      <b>State:</b> {address.state}
                    </p>
                    <p>
                      <b>Pincode:</b> {address.pincode}
                    </p>
                    {/* You can display other address fields as needed */}
                  </div>
                ))
              ) : (
                <p>No address found</p>
              )}
            </div>
          ) : (
            <p>Address: null</p>
          )}
        </div>
      </div>
    </Card>
  );
};
const DigitalCardlist = () => {
    const { data, isLoading, isError } = useList({
        resource: "users",
        meta: {
            populate: ["photo","addresses"]
        },
        filters: [{ field: 'org_name', operator: 'eq', value: 'CHETBANDE' }]}
    );
    const uniqueMobiles = {};
        
    console.log("data",data)
    const userlist = (data?.data ?? []).filter(user => {
        // If mobile number is not in the uniqueMobiles object, add it and return true
        if (!uniqueMobiles[user.mobile]) {
            uniqueMobiles[user.mobile] = true;
            return true;
        }
        return false;
    });
   // const userlist = data?.data ?? [];
    console.log("userlist", userlist);
    if (isLoading) {
        return <div>Loading...</div>;
    }

    if (isError) {
        return <div>Something went wrong!</div>;
    }

    console.log("Total user",userlist.length)
    return (
      <div style={{ padding: '2rem' }}>
        <Row gutter={[16, 16]}>
          {userlist.map((user, index) => (
            <Col key={index} xs={24} sm={12} md={8} lg={6}>
              <UserIdCard user={user} cardIndex={index} />
            </Col>
          ))}
        </Row>
      </div>
    );
  };
  
  export default DigitalCardlist;


