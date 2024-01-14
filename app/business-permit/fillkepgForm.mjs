// "use server";

// import puppeteer from 'puppeteer';

// import { createClient } from '@supabase/supabase-js';

// const supabaseUrl = 'https://wcmrsrnjtkrmfcjxmxpc.supabase.co';
// const supabaseAnonKey =
//   'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6IndjbXJzcm5qdGtybWZjanhteHBjIiwicm9sZSI6InNlcnZpY2Vfcm9sZSIsImlhdCI6MTcwMjcwNTA2NywiZXhwIjoyMDE4MjgxMDY3fQ.FNNRgt4R-lWE9OWRkO22DbdaKy9Y3HKYs2U1u6XvSXI';

// const supabase = createClient(supabaseUrl, supabaseAnonKey);

// const fillKepForm = async (selectedValues, selectedApplicantDetails) => {

//   console.log('Starting fillKspForm...');

//   // Extract applicantId from selectedValues
//   const applicantId = selectedValues.find((item) => item.id === 'applicantId')?.value;

//   if (!applicantId) {
//     console.error('Applicant ID not found in selectedValues.');
//     return;
//   }

//   console.log('Applicant ID from selectedValues:', applicantId);
//   console.log('Selected Applicant Details:', selectedApplicantDetails);

//   // Fetch all data of the user with the provided ID from Supabase
//   const { data: userDetails, error: userError } = await supabase
//     .from('applicantdetails')
//     .select('*')
//     .eq('applicantid', applicantId)
//     .single();

//   if (userError) {
//     console.error('Error fetching user details from Supabase:', userError);
//     return;
//   }

//   const { data: companyDetails, error: coError } = await supabase
//     .from('companyinformation')
//     .select('*')
//     .eq('applicantid', applicantId)
//     .single();

//   if (coError) {
//     console.error('Error fetching company details from Supabase:', coError); // Fix the error variable here
//     return;
//   }

//   console.log('User Details:', userDetails);
//   console.log('Company Details:', companyDetails);

//   const browser = await puppeteer.launch({
//     headless: false,
//     defaultViewport: null,
//     args: ['--start-maximized'],
//   });

//   const page = await browser.newPage();
//   await page.bringToFront();

//   await page.goto('https://fns.immigration.go.ke/account/login.html');

//   // Replace the email and password values with the actual ones
//   await page.type('#email', 'edwinnyakundi91@gmail.com');
//   await page.type('#regNo', '30247621');
//   await page.type('#password', 'Nyakundi298');

//   // Click the submit button
//   await page.click('#btnLogin');
//   await page.waitForTimeout(2000);

//   await page.goto('https://fns.immigration.go.ke/dash/permit/form25start.php?class=20');

  
//   const pass = selectedValues.find((item) => item.id === 'A')?.value || '';
//   await page.type('#applicationtypeId', pass);
  
//   const permit = 'F2433537';
// const permitType = selectedValues.find((item) => item.id === 'A')?.value || '';

// if (permitType === 'New Application') {
//   // Code specific to New Application
// } else if (permitType === 'Permit Renewal') {
//   // Code common to both New Application and Permit Renewal
//   await page.type('#prevpermit', permit);

//   const rNum = selectedValues.find((item) => item.id === 'C')?.value || '';
//   await page.type('#fileR', rNum);
// } else {
//   // Handle other cases if needed
// }

//   await page.type('#surname', userDetails?.lastname || '');
//   await page.type('#othernames', userDetails?.othernames || '');

  
//     await page.click('#dateOfBirth');

//   const dob = userDetails?.dateofbirth || ''; // Make sure this is in the correct format

//   if (dob) {
//     const [year, month, day] = dob.split('-');

//     // Select year
//     await page.click('#scwYears');
//     await page.type('#scwYears', year);

//     await page.click('#scwMonths');
//     await page.type('#scwMonths', month);

//     // Click on the day
//     const daySelector = `#scwCell_${day}`;
//     await page.click(daySelector);
//   }

//   await page.type('#countryOfBirth', userDetails?.countryofbirth || '');

  
//   await page.type('#genderId', userDetails?.gender || '');
//   await page.type('#presentNationality', userDetails?.nationality || '');
  
//   await page.type('#passport_no', userDetails?.indianpassportnumber || '');
  
//   await page.click('#dateOfIssue');

//   const doi = userDetails?.ppissuedate || ''; // Make sure this is in the correct format

//   if (doi) {
//     const [year, month, day] = doi.split('-');

//     // Select year
//     await page.click('#scwYears');
//     await page.type('#scwYears', year);

//     await page.click('#scwMonths');
//     await page.type('#scwMonths', month);

//     // Click on the day
//     const daySelector = `#scwCell_${parseInt(day, 10)}`;
//     await page.click(daySelector);
//   }

//   await page.click('#passportExpiryDate');

//   const doe = userDetails?.ppexpirydate || ''; // Make sure this is in the correct format

//   if (doe) {
//     const [year, month, day] = doe.split('-');

//     // Select year
//     await page.click('#scwYears');
//     await page.type('#scwYears', year);

//     await page.click('#scwMonths');
//     await page.type('#scwMonths', month);

//     // Click on the day
//     const daySelector = `#scwCell_${parseInt(day, 10)}`;
//     await page.click(daySelector);
//   }

//   await page.type('#placeOfIssue', companyDetails?.postaltown);
  
//   await page.type('#phone_no', companyDetails?.mobilenumberkenya || '');
  
//   await page.type('#email_address', userDetails?.emailcommunication1 || '');
//   await page.type('#postaladdress', userDetails?.postaladdress || '');
//   await page.type('#postalcode', userDetails?.postalcode || '');
//   await page.type('#city', userDetails?.postaltown || '');
//   await page.type('#kenyancellphone', companyDetails?.mobilenumberkenya  || '');

//   await page.type('#county', "Nairobi");
  
//   await page.click('#subcounty');
//   await page.type('#subcounty', "Starehe");
  
//   await page.type('#location', "Nairobi");
//   await page.type('#road', "Nairobi");
//   await page.type('#plotNo', "Nairobi");
//   await page.type('#town', "Nairobi");
  

//   await page.type('#imigrationStatus', "Specific trade, business or consultancy	(KEP/G)");
//   await page.type('#landmark', "Nairobi");


//   const [fileChooser] = await Promise.all([
//   page.waitForFileChooser(),
//   page.click('#photoToUpload'),
// ]);
//   await fileChooser.accept(['C:\\Users\\DELL\\Downloads\\empty.jpg']);
  
//   await page.click('.btn-success');
//   await page.waitForNavigation();
//   await page.waitForTimeout(2000)
//   await page.type('#permitclassId', "CLASS G - Specific trade, business or consultancy");
//   await page.type('#permittype', "CLASS G - Specific trade, business or consultancy");
//   await page.type('#permitNo', "2354870");
//   await page.click('#dateIssued');
  
//   if (doi) {
//     const [year, month, day] = doi.split('-');
    
//     // Select year
//     await page.click('#scwYears');
//     await page.type('#scwYears', year);
    
//     await page.click('#scwMonths');
//     await page.type('#scwMonths', month);
    
//     // Click on the day
//     const daySelector = `#scwCell_${parseInt(day, 10)}`;
//     await page.click(daySelector);
//   }
//   await page.type('#duration', "2 Years");
//   await page.click('#loadpreviouspermit > form > table > tbody > tr:nth-child(6) > td:nth-child(2) > input');
  
//   await page.waitForNavigation();


//   await page.click('#page-wrapper > div > div.panel-body > form > input.btn.btn-success');
//   // await page.waitForNavigation();

//   await page.type("#placeOfBusiness", companyDetails?.town);
//   await page.type("#nameOfBusiness" , companyDetails?.companyfullname);
//   await page.type("#typeOfBusiness", companyDetails?.companyactivity);
//   await page.type("#physicaladdress", companyDetails?.postaladdress);
//   await page.type("#availablecapital", "$500,000");
//   await page.type("#detailsofCapital", companyDetails?.companyactivity);
//   await page.type("#sourceOfIncome", companyDetails?.companyactivity);
//   await page.type("#presentCapitalLocality", companyDetails?.town);
//   await page.type("#professionName", "Jeweler");
//   await page.type("#detailsOfTrade", "Jeweler");
//   await page.type("#detailsOfLicense", "FINANCIAL STATEMENT");

//    const [fileChooser2] = await Promise.all([
//   page.waitForFileChooser(),
//   page.click('#part2fileToUpload1'),
//   ]);
//   await fileChooser2.accept(['C:\\Users\\DELL\\Downloads\\empty.pdf']);

//   // await page.waitForNavigation();
  
  
// }


// export default fillKepForm;

