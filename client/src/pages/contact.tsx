import { AccessTime, Email, Facebook, Instagram, Phone, Twitter } from '@mui/icons-material';
import { useList } from '@pankod/refine-core';
import { Box, Stack, Typography } from '@pankod/refine-mui';

const Contact = () => {
  const { data, isLoading, isError } = useList({
    resource: 'users',
  });

  if (isLoading) {
    return <div>Loading...</div>;
  }

  if (isError) {
    return <div>Something went wrong!</div>;
  }

  return (
    <Box>
      <Typography ml="30px" fontSize={25} fontWeight={700} color="#11142D">
        Contact Us
      </Typography>
      <Box m="30px 10px" display="flex" flexDirection="column" flexWrap="wrap" gap="30px" p="30px" borderRadius="15px" color="#808191" bgcolor="#FCFCFC">
        <Stack display="flex" flexDirection="row" gap="20px">
          <Typography fontWeight={700}>In Australia</Typography>
          <Phone />
          <Typography fontWeight={700}>02 1234 5678</Typography>
        </Stack>
        <Stack display="flex" flexDirection="row" gap="20px">
          <Typography fontWeight={700} mr="15px">Overseas</Typography>
          <Phone />
          <Typography fontWeight={700}>+61 1234 5678</Typography>
        </Stack>
        <Stack display="flex" flexDirection="row" gap="20px">
          <Typography fontWeight={700} mr="45px">Email</Typography>
          <Email />
          <Typography fontWeight={700}>service@2ndstyle.com.au</Typography>
        </Stack>
        <Stack display="flex" flexDirection="row" gap="20px">
          <Typography fontWeight={700} mr="41px">Hours</Typography>
          <AccessTime />
          <Typography fontWeight={700}>Mon-Fri 9:00 am - 6:00 pm</Typography>
        </Stack>
        <Stack display="flex" flexDirection="row" gap="20px">
          <Typography fontWeight={700} mr="40px">Social</Typography>
          <Facebook />
          <Instagram />
          <Twitter />
        </Stack>
      </Box>
    </Box>
  );
};

export default Contact;
