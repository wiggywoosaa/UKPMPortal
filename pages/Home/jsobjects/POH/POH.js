export default {
  getData: () => {

    const header = {
      CustomerDivision: Input_POHCustomerDivision.text,
      CustomerPurchaseOrderNumber: Input_POHCustomerPurchaseOrder.text,

      DateRecieved: DatePicker_POHDateRecieved.selectedDate
        ? new Date(DatePicker_POHDateRecieved.selectedDate).toISOString().split("T")[0]
        : null,

      TotalOrderValue: Input_POHTotalOrderValue.text
        ? parseFloat(Input_POHTotalOrderValue.text)
        : null,

      MicrossQuotationReference: Input_POHMicrossQuotationRefer.text || null,
      MicrossSalesOrderReference: Input_POHMicrossSalesOrderRef.text || null,

      LastBuildDate: DatePicker_POHLastBuildDate.selectedDate
        ? new Date(DatePicker_POHLastBuildDate.selectedDate).toISOString().split("T")[0]
        : null,

      OCRCheckComplete: DatePicker_POHOCRCheckComplete.selectedDate
        ? new Date(DatePicker_POHOCRCheckComplete.selectedDate).toISOString().split("T")[0]
        : null,

      BidExpiryDateOrDetailsOfReQuote: DatePicker_POHBidExpiryDateOrD.selectedDate
        ? new Date(DatePicker_POHBidExpiryDateOrD.selectedDate).toISOString().split("T")[0]
        : null,
			
			MicrossEntity: Select_PHOMicrossEntity.selectedOptionValue || null,

      // 🔥 NEW
      SubmittedBy: appsmith.user.email || appsmith.user.name || "Unknown",
			
			Currency: Input_POHCurrency.countryCode || null,
    };

    const po = header.MicrossSalesOrderReference;

    return {
      header,

      deliverables: (Table_Deliverables.tableData || [])
        .filter(r => r.CustomerPartNumber || r.MicrossPartNumber)
        .map(r => ({
          MicrossSalesOrderReference: po,
          CustomerPartNumber: r.CustomerPartNumber || null,
          CustomerRevIssue: r.CustomerRevIssue || null,
          MicrossPartNumber: r.MicrossPartNumber || null,
          TotalDeliveryQty: r.TotalDeliveryQty ? parseFloat(r.TotalDeliveryQty) : 0,
          QuotedYeild: r.QuotedYeild ? parseFloat(r.QuotedYeild) : 0,
          StartQty: r.StartQty ? parseFloat(r.StartQty) : 0,
          QuotedLeadTime: r.QuotedLeadTime || null
        })),

      groupTests: (Table_GroupTests.tableData || [])
        .filter(r => r.CustomerPartNumber || r.MicrossPartNumber)
        .map(r => ({
          MicrossSalesOrderReference: po,
          CustomerPartNumber: r.CustomerPartNumber || null,
          CustomerRevIssue: r.CustomerRevIssue || null,
          MicrossPartNumber: r.MicrossPartNumber || null,
          TotalDeliveryQty: r.TotalDeliveryQty ? parseFloat(r.TotalDeliveryQty) : 0,
          QuotedYeild: r.QuotedYeild ? parseFloat(r.QuotedYeild) : 0,
          StartQty: r.StartQty ? parseFloat(r.StartQty) : 0,
          QuotedLeadTime: r.QuotedLeadTime || null
        })),

      nre: (Table_NRE.tableData || [])
        .filter(r => r.Description)
        .map(r => ({
          MicrossSalesOrderReference: po,
          Description: r.Description || null,
          StartQty: r.StartQty ? parseFloat(r.StartQty) : 0,
          QuotedLeadTime: r.QuotedLeadTime || null
        }))
    };
  }
};