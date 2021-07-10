import React from 'react';
import { PageContainer } from '@ant-design/pro-layout';
import { HeartTwoTone, SmileTwoTone } from '@ant-design/icons';
import { Card, Alert, Typography } from 'antd';
import { useIntl } from 'umi';

export default (): React.ReactNode => {
  const intl = useIntl();
  return (
    <PageContainer>
      <Card>
        <Alert
          message={intl.formatMessage({
            id: 'pages.welcome.alertMessage',
            defaultMessage: 'Faster and stronger heavy-duty components have been released.',
          })}
          type="success"
          showIcon
          banner
          style={{
            margin: -12,
            marginBottom: 24,
          }}
        />
        <Typography.Title level={2} style={{ textAlign: 'center', margin: '96px 0' }}>
          <SmileTwoTone /> Balmuda <HeartTwoTone twoToneColor="#eb2f96" /> You
        </Typography.Title>
      </Card>
    </PageContainer>
  );
};
