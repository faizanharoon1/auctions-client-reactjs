import { Typography, Box, Button, Grid, Paper } from '@mui/material';
import { Formik, Form, Field } from 'formik';
import { TextField } from 'formik-mui';
import * as Yup from 'yup';
import { AuctionService } from '../../services/auctions-service';
import { useUser } from '../../store/UserContext';

// Define validation schema using Yup
const validationSchema = Yup.object({
  auctionName: Yup.string().required('Auction name is required'),
  reservePrice: Yup.number().positive('Reserve price must be a positive number').required('Reserve price is required'),
  itemDescription: Yup.string().required('Item description is required'),
});

function AuctionsForm({ gridRefresh }) {
    const { user } = useUser();
  return (
    <Paper sx={{ p: 2, mt: 2 }}>
      <Formik
        initialValues={{
          auctionName: '',
          reservePrice: '',
          itemDescription: '',
        }}
        validationSchema={validationSchema}
        onSubmit={async (values, { setSubmitting, resetForm }) => {
          try {
            const addedItem = await AuctionService.addAuctionItem({
              ...values,
              reservePrice: parseFloat(values.reservePrice),
              userId: user.name,
              items: [{itemDescription:values.itemDescription}]
            });
            if (addedItem) {
              gridRefresh(); // Invoke the parent component's refresh function
              resetForm(); // Reset the form after successful submission
            }
          } catch (error) {
            console.error('Error adding auction item:', error);
          } finally {
            setSubmitting(false);
          }
        }}
      >
        {({ submitForm, isSubmitting, handleChange, handleBlur, values, touched, errors }) => (
          <Form>
            <Box sx={{ mt: 1 }}>
              <Typography variant="h5" gutterBottom>
                Add New
              </Typography>
              <Grid container spacing={2} direction="column">
                <Grid item xs={12}>
                  <Field
                    component={TextField}
                    name="auctionName"
                    label="Auction Name"
                    fullWidth
                  />
                </Grid>
                <Grid item xs={12}>
                  <Field
                    component={TextField}
                    name="reservePrice"
                    label="Reserve Price"
                    type="number"
                    fullWidth
                  />
                </Grid>
                <Grid item xs={12}>
                  <Field
                    component={TextField}
                    name="itemDescription"
                    label="Item Description"
                    fullWidth
                    multiline
                    rows={4}
                  />
                </Grid>
                <Grid item xs={12}>
                  <Button 
                    onClick={submitForm} 
                    variant="contained" 
                    fullWidth
                    disabled={isSubmitting}
                  >
                    Add Item
                  </Button>
                </Grid>
              </Grid>
            </Box>
          </Form>
        )}
      </Formik>
    </Paper>
  );
}

export default AuctionsForm;
