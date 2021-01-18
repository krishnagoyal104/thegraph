import { store, BigInt, Address } from "@graphprotocol/graph-ts"
import {
  Contract,
  LogNewRequest,
  LogNewOffer,
  LogCancelRequest,
  LogCancelOffer,
  LogAcceptRequest,
  LogAcceptOffer,
  LogInstallmentPaid,
  LogCollateralReturned,
  LogCollateralClaimed,
  LogOraclizeQuery,
  LogResultReceived
} from "../generated/Contract/Contract"
import { Loan } from "../generated/schema"

export function handleLogNewRequest(event: LogNewRequest): void {

  let entity = new Loan(event.params._id.toString())

  entity.index = event.params._id
  entity.state = "Pending"
  entity.loanAmount = event.params._loanAmount
  entity.collateralAmount = event.params._collateralAmount
  entity.installments = event.params._installments
  entity.installmentsPaid = BigInt.fromI32(0)
  entity.interest = event.params._interest
  entity.time = BigInt.fromI32(0)
  entity.borrower = event.params._borrower

  entity.save()

}

export function handleLogNewOffer(event: LogNewOffer): void {

  let entity = new Loan(event.params._id.toString())

  entity.index = event.params._id
  entity.state = "Pending"
  entity.loanAmount = event.params._loanAmount
  entity.collateralAmount = event.params._collateralAmount
  entity.installments = event.params._installments
  entity.installmentsPaid = BigInt.fromI32(0)
  entity.interest = event.params._interest
  entity.time = BigInt.fromI32(0)
  entity.lender = event.params._lender

  entity.save()

}

export function handleLogCancelRequest(event: LogCancelRequest): void {

  let entity = Loan.load(event.params._id.toString())

  store.remove('Loan', event.params._id.toString())

}

export function handleLogCancelOffer(event: LogCancelOffer): void {

  let entity = Loan.load(event.params._id.toString())

  store.remove('Loan', event.params._id.toString())

}

export function handleLogAcceptRequest(event: LogAcceptRequest): void {

  let entity = Loan.load(event.params._id.toString())

  entity.state = "Accepted"
  entity.time = event.block.timestamp
  entity.lender = event.params._lender

  entity.save()

}

export function handleLogAcceptOffer(event: LogAcceptOffer): void {

  let entity = Loan.load(event.params._id.toString())

  entity.state = "Accepted"
  entity.time = event.block.timestamp
  entity.borrower = event.params._borrower

  entity.save()

}

export function handleLogInstallmentPaid(event: LogInstallmentPaid): void {

  let entity = Loan.load(event.params._id.toString())

  entity.installmentsPaid = event.params._numberOfInstallments

  entity.save()

}

export function handleLogCollateralReturned(
  event: LogCollateralReturned
): void {

  let entity = Loan.load(event.params._id.toString())

  entity.state = "Completed"

  entity.save()

}

export function handleLogCollateralClaimed(event: LogCollateralClaimed): void {

  let entity = Loan.load(event.params._id.toString())

  entity.state = "Defaulted"

  entity.save()

}

export function handleLogOraclizeQuery(event: LogOraclizeQuery): void {}

export function handleLogResultReceived(event: LogResultReceived): void {}
