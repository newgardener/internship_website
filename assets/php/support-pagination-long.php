<?php
switch($first_url) {
    case "solution":
        $bold_solution = 'bolder';
        break;
	case "company":
		$bold_solution = 'bolder';
		break;
}	

function pagination($current_page, $total_page) 
{
    $current = $current_page;
    $last = $total_page;
    $delta = 2;
    $left = $current - $delta;
    $right = $current + $delta + 1;
    $range = array();
    $rangeWithDots = array();
    $l = -1;

    for ($i = 1; $i <= $last; $i++) 
    {
        if ($i == 1 || $i == $last || $i >= $left && $i < $right) 
        {
            array_push($range, $i);
        }
    }

    for($i = 0; $i < count($range); $i++) 
    {
        if ($l != -1) 
        {
            if ($range[$i] - $l === 2) 
            {
                array_push($rangeWithDots, $l + 1);
            } 
            else if ($range[$i] - $l !== 1) 
            {
                array_push($rangeWithDots, '...');
            }
        }
        
        array_push($rangeWithDots, $range[$i]);
        $l = $range[$i];
    }

    return $rangeWithDots;
}

?>
<nav class="table-footer text-center row align-items-center justify-content-center">
    <ul class="pagination">
    <li class="page-item">
<?php 

    $prev_page = 1;
    if (isset($_GET['page']) && $_GET['page'] > 1) $prev_page = $_GET['page'] - 1;
    echo '
        <a class="page-link" href="/app/company/newsnmedia.php?page='.$prev_page.'" aria-label="Previous" id="page-prev-link"> 
            <svg width="9" height="12" viewBox="0 0 9 12" fill="none" xmlns="http://www.w3.org/2000/svg">
                <path d="M8.40991 1.41L3.46524 6L8.40991 10.59L6.88764 12L0.409912 6L6.88765 -6.65404e-08L8.40991 1.41Z" fill="#A3A4AC"/>
            </svg>
        </a>
    ';

?>
    </li>
<?php
    foreach(pagination($curr_page, $total_page) as $page) {

        if ($page == "...") {
            echo '
                <li class="page-item">
                    <span class="page-dots">
                        <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" class="bi bi-three-dots" viewBox="0 0 16 16">
                            <path d="M3 9.5a1.5 1.5 0 1 1 0-3 1.5 1.5 0 0 1 0 3zm5 0a1.5 1.5 0 1 1 0-3 1.5 1.5 0 0 1 0 3zm5 0a1.5 1.5 0 1 1 0-3 1.5 1.5 0 0 1 0 3z"/>
                        </svg>
                    </span>
                </li>
            ';
        }
        else if ($page == $curr_page) {
            echo '
                <li class="page-item">
                    <a class="page-link curr-page" href="/app/company/newsnmedia.php?page='.$page.'">
                        '.$page.'
                    </a>
                </li>
            ';
        } else {
            echo '
                <li class="page-item">
                    <a class="page-link" href="/app/company/newsnmedia.php?page='.$page.'">
                        '.$page.'
                    </a>
                </li>
            ';
        }

    }
?>
    <li class="page-item">
<?php 

    if (isset($_GET['page'])) {
        if ($_GET['page'] < $total_page) { $next_page = $_GET['page'] + 1;}
        else $next_page = $_GET['page'];
    } else {
        $next_page = 2;
    }
        echo '
            <a class="page-link" href="/app/company/newsnmedia.php?page='.$next_page.'" aria-label="Next" id="page-next-link"> 
                <svg width="9" height="12" viewBox="0 0 9 12" fill="none" xmlns="http://www.w3.org/2000/svg">
                    <path d="M0.590088 10.59L5.53476 6L0.590088 1.41L2.11236 1.81529e-08L8.59009 6L2.11235 12L0.590088 10.59Z" fill="#A3A4AC"/>
                </svg>
            </a>
        ';
?>
    </li>
    </ul>
</nav>