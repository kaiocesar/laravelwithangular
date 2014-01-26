<?php
/**
 *	Product Model
 *	@todo Modelo de tabela de banco de dados <products>
 *	@author Kaio Cesar <programador.kaio@gmail.com>
 */

class Product extends Eloquent
{

	/**
	 *	@var $table string <table name>
	 */
	protected $table = "products";


	/**
	 *	department
	 *	@todo Função de relacionamento com a table "departments"
	 *	@return object
	 */
	public function department() 
	{
		return $this->belongsTo('Department', 'departments_id');
	}


}