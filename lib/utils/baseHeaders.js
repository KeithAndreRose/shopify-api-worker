import corsHeaders from "./corsHeaders";

export default new Headers({
  "content-type": "application/json",
  ...corsHeaders
})