/* eslint-disable @typescript-eslint/ban-ts-comment */
import { Box, Typography, FormControl, FormHelperText, TextField, TextareaAutosize, Stack, Select, MenuItem, Button } from '@pankod/refine-mui';

import { FormProps } from 'interfaces/common';
import CustomButton from './CustomButton';

const Form = ({ type, register, handleSubmit, handleImageChange, formLoading, onFinishHandler, postImage }: FormProps) => (
  <Box>
    <Typography fontSize={25} fontWeight={700} color="#11142D">{type} a Post</Typography>

    <Box mt={2.5} borderRadius="15px" padding="20px" bgcolor="#FCFCFC">
      <form
        style={{ marginTop: '20px', width: '100%', display: 'flex', flexDirection: 'column', gap: '20px' }}
        onSubmit={handleSubmit(onFinishHandler)}
      >
        <FormControl>
          <FormHelperText sx={{ fontWeight: 500, margin: '10px 0', fontSize: 16, color: '#11142D' }}>Enter post name</FormHelperText>
          <TextField
            fullWidth
            required
            id="outlined-basic"
            color="info"
            variant="outlined"
            {...register('title', { required: true })}
          />
        </FormControl>

        <FormControl>
          <FormHelperText sx={{ fontWeight: 500, margin: '10px 0', fontSize: 16, color: '#11142D' }}>Post Description</FormHelperText>
          <TextareaAutosize
            minRows={5}
            required
            placeholder="Write description of post"
            color="info"
            style={{ width: '100%', background: 'transparent', fontSize: '16px', borderColor: 'rgba(0, 0, 0, 0.23)', borderRadius: 6, padding: 10, color: '#919191' }}
            {...register('description', { required: true })}
          />
        </FormControl>

        <Stack direction="row" gap={4}>
          <FormControl sx={{ flex: 1 }}>
            <FormHelperText
              sx={{
                fontWeight: 500,
                margin: '10px 0',
                fontSize: 16,
                color: '#11142D',
              }}
            >
              Enter post type
            </FormHelperText>
            <Select
              variant="outlined"
              color="info"
              displayEmpty
              required
              inputProps={{ 'aria-label': 'Without label' }}
              defaultValue="apartment"
              {...register('postType', { required: true })}
            >
              <MenuItem value="top">Top</MenuItem>
              <MenuItem value="dresses">Dresses</MenuItem>
              <MenuItem value="jumpers">Jumpers</MenuItem>
              <MenuItem value="hoodies">Hoodies</MenuItem>
              <MenuItem value="jackets">Jackets</MenuItem>
              <MenuItem value="skirts">Skirts</MenuItem>
              <MenuItem value="pants">Pants</MenuItem>
              <MenuItem value="shoes">Shoes</MenuItem>
              <MenuItem value="accessories">Accessories</MenuItem>
            </Select>
          </FormControl>

          <FormControl sx={{ flex: 1 }}>
            <FormHelperText sx={{ fontWeight: 500, margin: '10px 0', fontSize: 16, color: '#11142D' }}>Enter post price</FormHelperText>
            <TextField
              fullWidth
              required
              id="outlined-basic"
              variant="outlined"
              color="info"
              type="number"
              {...register('price', { required: true })}
            />
          </FormControl>
        </Stack>

        <FormControl>
          <FormHelperText sx={{ fontWeight: 500, margin: '10px 0', fontSize: 16, color: '#11142D' }}>Enter location</FormHelperText>
          <TextField
            fullWidth
            required
            id="outlined-basic"
            variant="outlined"
            color="info"
            {...register('location', { required: true })}
          />
        </FormControl>

        <Stack direction="column" gap={1} justifyContent="center" mb={2}>
          <Stack direction="row" gap={2}>
            <Typography color="#11142D" fontSize={16} fontWeight={500} my="10px">Post Photo</Typography>

            <Button component="label" sx={{ width: 'fit-content', color: '#2ED480', textTransform: 'capitalize', fontSize: 16 }}>
              Upload *
              <input
                hidden
                accept="image/*"
                type="file"
                onChange={(e) => {
                  // @ts-ignore
                  handleImageChange(e.target.files[0]);
                }}
              />
            </Button>
          </Stack>
          <Typography fontSize={14} color="#808191" sx={{ wordBreak: 'break-all' }}>
            {postImage?.name}
          </Typography>
        </Stack>

        <CustomButton
          type="submit"
          title={formLoading ? 'Submitting...' : 'Submit'}
          backgroundColor="#e31953"
          color="#FCFCFC"
        />
      </form>
    </Box>
  </Box>
);

export default Form;
