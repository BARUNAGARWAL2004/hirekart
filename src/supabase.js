import { createClient } from "@supabase/supabase-js";

const supabaseUrl = "https://tlhafwmxbhuloytchwbi.supabase.co";
const supabaseKey = "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6InRsaGFmd214Ymh1bG95dGNod2JpIiwicm9sZSI6ImFub24iLCJpYXQiOjE3NzM0MTU1NTAsImV4cCI6MjA4ODk5MTU1MH0.iOKle--JCluKaPuusmYN-PDnMOULSY_nbH7gEnJUXsU";

export const supabase = createClient(supabaseUrl, supabaseKey);