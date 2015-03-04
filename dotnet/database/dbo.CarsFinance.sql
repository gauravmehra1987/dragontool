CREATE TABLE [dbo].CarsFinance
(
	[ID] INT NOT NULL PRIMARY KEY,
	CarID int Not Null, 
	Term int,
	MonthlyPayments decimal(19,4),
	OnTheRoad decimal(19,4),
	CustomerDeposit decimal(19,4),
	RetailerDeposit decimal(19,4),
	OptionToPurchase decimal(19,4),
	OptionalFinalPayment decimal(19,4),
	TotalPayable decimal(19,4),
	TotalCredit decimal(19,4),
	InterestRate decimal (9,4),
	RepresentativeApr decimal(9,4),


    CONSTRAINT [FK_CarsFinance_Cars] FOREIGN KEY (CarId) REFERENCES Cars ([Id])
)
